import express from 'express';
import { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } from '../controller/invoiceController.js';
import { clerkMiddleware } from '@clerk/express';

const invoiceRouter = express.Router();

invoiceRouter.use(clerkMiddleware());

invoiceRouter.get("/", getInvoices);
invoiceRouter.get("/:id", getInvoiceById);
invoiceRouter.post("/", createInvoice);
invoiceRouter.put("/:id", updateInvoice);
invoiceRouter.delete("/:id", deleteInvoice);

export default invoiceRouter;