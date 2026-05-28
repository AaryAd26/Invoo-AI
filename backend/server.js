import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'
import {connectDB} from './config/db.js';
import path from 'path';
import invoiceRouter from './routes/invoiceRouter.js';
import buinessProfileRouter from './routes/buinessProfileRouter.js';
import aiInvoiceRouter from './routes/aiInvoiceRouter.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 4000;

// MIDDLEWEAR
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));

app.use(clerkMiddleware({
    authorizedParties: ['http://localhost:5173']
}));

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true}))

// DATABASE
connectDB();

// ✅ ONE-TIME MIGRATION: rename "Items" (capital I) to "items" (lowercase)
// This fixes all existing invoices saved with the wrong field name
// Safe to keep here forever — if nothing to rename, it just does nothing
setTimeout(async () => {
    try {
        const db = mongoose.connection;
        if (db.readyState === 1) {
            const result = await db.collection('invoices').updateMany(
                { Items: { $exists: true } },
                { $rename: { "Items": "items" } }
            );
            if (result.modifiedCount > 0) {
                console.log(`✅ Migration done: renamed "Items" → "items" in ${result.modifiedCount} invoice(s)`);
            }
        }
    } catch (err) {
        console.warn('Migration warning (non-fatal):', err.message);
    }
}, 3000); // wait 3s for DB connection to be ready

// ROUTES
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/invoices', invoiceRouter);
app.use('/api/business-profile', buinessProfileRouter); 
app.use('/api/ai', aiInvoiceRouter);

app.get('/' , (req, res) => {
    res.send("API WORKING")
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});