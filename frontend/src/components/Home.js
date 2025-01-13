import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of invoices from the backend
    axios
      .get("http://localhost:5000/api/invoices")
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        console.error("Error fetching invoices:", err);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      axios
        .delete(`http://localhost:5000/api/invoices/${id}`)
        .then(() => {
          // Remove the deleted invoice from the state
          setInvoices(invoices.filter((invoice) => invoice.id !== id));
          alert("Invoice deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting invoice:", err);
        });
    }
  };

  const handleUpdate = (id) => {
    // Navigate to the invoice form for editing
    navigate(`/invoice-form/${id}`);
  };

  return (
    <div className="home-container">
      <header>
        <h1>Invoices</h1>
        <Link to="/invoice-form" className="add-invoice-button">
          Add Invoice
        </Link>
      </header>
      {invoices.length > 0 ? (
        <ul className="invoice-list">
          {invoices.map((invoice) => (
            <li key={invoice.id} className="invoice-item">
              <p>
                <strong>Invoice #:</strong> {invoice.invoiceNumber}
              </p>
              <p>
                <strong>Client:</strong> {invoice.clientName}
              </p>
              <p>
                <strong>Amount:</strong> ${invoice.amount}
              </p>
              <p>
                <strong>Status:</strong> {invoice.status}
              </p>
              <div className="actions">
                <button
                  className="edit-button"
                  onClick={() => handleUpdate(invoice.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No invoices available. Add your first invoice!</p>
      )}
    </div>
  );
};

export default Home;
