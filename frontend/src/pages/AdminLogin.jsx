import React, { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa"; // Icons import
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  let navigate = useNavigate(null)

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      // Example: minimum password length
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let response = await fetch("https://evnetbooking-production.up.railway.app/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
      });
      let resData = await response.json();

      console.log("res==>", resData);
      if(response.status !== 200)  throw new Error(resData.message);

      navigate('/adminDashboard')
      
      
      

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Admin Login</h2>
        <p className="login-subtitle">Access your event management dashboard</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="form-icon" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
              placeholder="admin@example.com"
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="form-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
              placeholder="********"
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="login-btn">
            <FaSignInAlt className="login-btn-icon" />
            Login
          </button>
        </form>
        <p className="forgot-password-link">
          <a href="#">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;
