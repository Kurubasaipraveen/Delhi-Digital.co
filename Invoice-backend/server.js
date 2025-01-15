const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Import routes
const invoiceRoutes = require("./routes/invoices");
app.use("/api/invoices", invoiceRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
