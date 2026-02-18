import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const success = await login(email, password);
      navigate('/')
      if (!success) {
        alert("Invalid email and password!");
        return;
      } 
    }catch (err) {
        setError("Invalid email or password")
      }
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your account</p>
        <form className="customForm" onSubmit={userLogin}>
          <input type="email" placeholder="Email" name="email" className="auth-input" onChange={handleChange} value={form.email} />
          <input type="password" placeholder="Password" onChange={handleChange} className="auth-input" name="password" value={form.password} />        

          <button className="auth-btn">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>

  );
}
