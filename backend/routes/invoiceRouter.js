import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "../controller/invoiceController.js";

import { requireAuth } from "@clerk/express";

const invoiceRouter = express.Router();

/*
========================================
AUTH MIDDLEWARE
========================================
*/

invoiceRouter.use(requireAuth());

/*
========================================
GET ALL INVOICES
========================================
*/

invoiceRouter.get("/", async (req, res) => {
  try {
    await getInvoices(req, res);
  } catch (error) {
    console.error(
      "GET INVOICES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch invoices",
    });
  }
});

/*
========================================
GET SINGLE INVOICE
========================================
*/

invoiceRouter.get("/:id", async (req, res) => {
  try {
    await getInvoiceById(req, res);
  } catch (error) {
    console.error(
      "GET SINGLE INVOICE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch invoice",
    });
  }
});

/*
========================================
CREATE INVOICE
========================================
*/

invoiceRouter.post("/", async (req, res) => {
  try {
    await createInvoice(req, res);
  } catch (error) {
    console.error(
      "CREATE INVOICE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create invoice",
    });
  }
});

/*
========================================
UPDATE INVOICE
========================================
*/

invoiceRouter.put("/:id", async (req, res) => {
  try {
    await updateInvoice(req, res);
  } catch (error) {
    console.error(
      "UPDATE INVOICE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update invoice",
    });
  }
});

/*
========================================
DELETE INVOICE
========================================
*/

invoiceRouter.delete("/:id", async (req, res) => {
  try {
    await deleteInvoice(req, res);
  } catch (error) {
    console.error(
      "DELETE INVOICE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete invoice",
    });
  }
});

export default invoiceRouter;