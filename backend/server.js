import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'
import {connectDB} from './config/db.js';
import path from 'path';
import invoiceRouter from './routes/invoiceRouter.js';
import buinessProfileRouter from './routes/buinessProfileRouter.js';
import aiInvoiceRouter from './routes/aiInvoiceRouter.js';

const app = express();
const PORT = 4000;

// MIDDLEWEAR
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));

// ✅ ADD THIS BACK
app.use(clerkMiddleware({
    authorizedParties: ['http://localhost:5173']
}));

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true}))

// DATABASE
connectDB();

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