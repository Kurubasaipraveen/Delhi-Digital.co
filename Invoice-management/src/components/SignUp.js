import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Signup.css';

function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if the email is already registered
    const isEmailRegistered = existingUsers.some(user => user.email === formData.email);
    
    if (isEmailRegistered) {
      alert("Email is already registered. Please log in.");
    } else {
      // Save the new user to localStorage
      const updatedUsers = [...existingUsers, formData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      alert("User registered successfully!");
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <p>Already have an account? <a href="/">Login...</a></p>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
