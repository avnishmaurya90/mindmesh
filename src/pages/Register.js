import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const userRegister = async(e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try{
      const success = await register(name, email, password);
      navigate('/login');
      if(!success){
        alert("User already exists");
        return
      }
    } catch(err){
      setError(err.message)
    }

  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join and start your learning journey</p>
        <form onSubmit={userRegister} className="customForm">
          <input type="text" placeholder="Full Name" onChange={handleChange} className="auth-input" name="name" value={form.name} />
          <input type="email" placeholder="Email Address" onChange={handleChange} className="auth-input" name="email" value={form.email} />
          <input type="password" placeholder="Password" onChange={handleChange} className="auth-input" name="password" value={form.password} />
          <input type="password" placeholder="Confirm Password" onChange={handleChange} className="auth-input" name="confirmPassword" value={form.confirmPassword} />

          <button className="auth-btn">Register</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>

  );
}
