import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("invoiceNumber");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of invoices from the backend
    axios
      .get("https://delhi-digital-co.onrender.com/api/invoices")
      .then((res) => {
        setInvoices(res.data);
        setFilteredInvoices(res.data);
      })
      .catch((err) => {
        console.error("Error fetching invoices:", err);
      });
  }, []);

  useEffect(() => {
    // Filter and sort invoices whenever searchQuery, sortField, or sortOrder changes
    let updatedInvoices = [...invoices];

    // Apply search filter
    if (searchQuery) {
      updatedInvoices = updatedInvoices.filter((invoice) =>
        invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    updatedInvoices.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredInvoices(updatedInvoices);
  }, [searchQuery, sortField, sortOrder, invoices]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      axios
        .delete(`https://delhi-digital-co.onrender.com/api/invoices/${id}`)
        .then(() => {
          // Remove the deleted invoice state
          const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
          setInvoices(updatedInvoices);
          alert("Invoice deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting invoice:", err);
        });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/invoice-form/${id}`);
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      //  sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field ascending order
      setSortField(field);
      setSortOrder("asc");
    }
  };
  const Logout=()=>{
    navigate('/')
  }

  return (
    <div className="home-container">
      <header>
        <h1>Invoices</h1>
        <Link to="/invoice-form" className="add-invoice-button">
          Add Invoice
        </Link>
        <button onClick={Logout}>Logout</button>
      </header>

      <div className="filter-sort-container">
        <input
          type="text"
          placeholder="Search by client name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <div className="sort-options">
          <button onClick={() => handleSortChange("invoiceNumber")}>
            Sort by Invoice # {sortField === "invoiceNumber" ? `(${sortOrder})` : ""}
          </button>
          <button onClick={() => handleSortChange("amount")}>
            Sort by Amount {sortField === "amount" ? `(${sortOrder})` : ""}
          </button>
          <button onClick={() => handleSortChange("clientName")}>
            Sort by Client {sortField === "clientName" ? `(${sortOrder})` : ""}
          </button>
        </div>
      </div>

      {filteredInvoices.length > 0 ? (
        <ul className="invoice-list">
          {filteredInvoices.map((invoice) => (
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
