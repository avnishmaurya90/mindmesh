import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Sidebar() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser && currentUser.role === 'admin';
  return (
    <div className="sidebar">
      <h2 className="logo">SKH</h2>
      <ul className="menu">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/mylearning" className={({ isActive }) => isActive ? "active" : undefined}>My Learning</NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" className={({ isActive }) => isActive ? "active" : undefined}>Bookmarks</NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? "active" : undefined}>Analytics</NavLink>
        </li>
        {isAdmin && (
          <li>
            <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : undefined}>Admin Panel</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
