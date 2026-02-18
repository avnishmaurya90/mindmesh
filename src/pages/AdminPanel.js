import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "Avnish", role: "User" },
    { id: 2, name: "Rahul", role: "Admin" },
    { id: 3, name: "Priya", role: "User" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />

        <div className="content">
          <div className="page-header">
            <h2>Admin Panel</h2>
            <input
              type="text"
              placeholder="Search user..."
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "250px" }}
            />
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>3</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <h3>1</h3>
              <p>Admins</p>
            </div>
            <div className="stat-card">
              <h3>2</h3>
              <p>Normal Users</p>
            </div>
          </div>

          {/* Admin Table */}
          <div className="admin-table">
            <div className="admin-row header">
              <span>User</span>
              <span>Role</span>
              <span>Actions</span>
            </div>

            {filteredUsers.map((user) => (
              <div className="admin-row" key={user.id}>
                <div className="user-info">
                  <div className="user-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <span>{user.name}</span>
                </div>

                <select className="role-select" defaultValue={user.role}>
                  <option>User</option>
                  <option>Admin</option>
                </select>

                <button className="danger-btn">Delete</button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="secondary-btn">Prev</button>
            <span>Page 1 of 1</span>
            <button className="secondary-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
