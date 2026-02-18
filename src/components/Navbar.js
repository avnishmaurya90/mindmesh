import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
 
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
    const { logout } = useAuth(); 
    const navigate = useNavigate();
  // Close dropdown when clicking outside
  const redirect = () => {
    navigate('/profile')
    setOpen(false);
  }
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <h3>Dashboard</h3>

      <div className="nav-right" ref={dropdownRef}>
        {/* <button className="secondary-btn">Dark Mode</button> */}

        <div className="avatar-wrapper">
          <div className="avatar" onClick={() => setOpen(!open)}>
            A
          </div>

          {open && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={redirect}>Profile</button>
              <button className="dropdown-item logout" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
