const express = require("express");
const router = express.Router();

let invoices = [];

// Get all invoices
router.get("/", (req, res) => {
  res.json(invoices);
});

// Create a new invoice
router.post("/", (req, res) => {
  const newInvoice = { id: Date.now(), ...req.body };
  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

// Update an invoice by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = invoices.findIndex((inv) => inv.id == id);

  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...req.body };
    res.json(invoices[index]);
  } else {
    res.status(404).json({ message: "Invoice not found" });
  }
});

// Delete an invoice by ID
router.delete("/:id", (req, res) => {
  invoices = invoices.filter((inv) => inv.id != req.params.id);
  res.status(204).send();
});

module.exports = router;
