import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/invoice.css";

function InvoiceForm() {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    date: "",
    amount: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // Get the invoice ID from the URL

  useEffect(() => {
    if (id) {
      // Fetch existing invoice data for editing
      axios
        .get(`http://localhost:5000/api/invoices/${id}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching invoice data:", err);
        });
    }
  }, [id]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.invoiceNumber.trim()) newErrors.invoiceNumber = "Invoice number is required.";
    if (!formData.clientName.trim()) newErrors.clientName = "Client name is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.amount) newErrors.amount = "Amount is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        // Update existing invoice
        axios
          .put(`https://delhi-digital-co.onrender.com/api/invoices/${id}`, formData)
          .then(() => {
            alert("Invoice updated successfully!");
            navigate("/home");
          })
          .catch((err) => {
            console.error("Error updating invoice:", err);
          });
      } else {
        // Create a new invoice
        axios
          .post("https://delhi-digital-co.onrender.com/api/invoices", formData)
          .then(() => {
            alert("Invoice added successfully!");
            navigate("/home");
          })
          .catch((err) => {
            console.error("Error adding invoice:", err);
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2>{id ? "Edit Invoice" : "Add Invoice"}</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Invoice Number"
          value={formData.invoiceNumber}
          onChange={(e) =>
            setFormData({ ...formData, invoiceNumber: e.target.value })
          }
        />
        {errors.invoiceNumber && (
          <p className="error-message">{errors.invoiceNumber}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
        />
        {errors.clientName && (
          <p className="error-message">{errors.clientName}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        {errors.date && <p className="error-message">{errors.date}</p>}
      </div>

      <div className="form-group">
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        {errors.amount && <p className="error-message">{errors.amount}</p>}
      </div>

      <div className="form-group">
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <button type="submit">{id ? "Update" : "Save"}</button>
    </form>
  );
}

export default InvoiceForm;
