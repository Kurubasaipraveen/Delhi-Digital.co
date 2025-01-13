import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import InvoiceForm from "./components/InvoiceForm";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [invoices, setInvoices] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route
          path="/home"
          element={<Home invoices={invoices} setInvoices={setInvoices} />}
        />
        <Route
          path="/invoice-form"
          element={<InvoiceForm invoices={invoices} setInvoices={setInvoices} />}
        />
        <Route
          path="/invoice-form/:id"
          element={<InvoiceForm invoices={invoices} setInvoices={setInvoices} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
