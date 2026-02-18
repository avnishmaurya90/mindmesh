import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { logout } = useAuth();   
    return (
        <div className="layout">
            <Sidebar />
            <div className="main">
                <Navbar />

                <div className="content">
                    <h2 className="page-title">My Profile</h2>
                    <div className="profile-card">
                        <div className="profile-header">
                            <div className="profile-avatar">A</div>
                            <div className="profile-info">
                                <h3>Avnish</h3>
                                <p className="profile-role">Admin</p>
                            </div>
                        </div>
                        <div className="profile-body">
                            <div className="profile-field">
                                <label>Email</label>
                                <input type="text" value="avnish@email.com" readOnly />
                            </div>
                            <div className="profile-field">
                                <label>Role</label>
                                <input type="text" value="Admin" readOnly />
                            </div>
                            <div className="profile-field">
                                <label>Joined On</label>
                                <input type="text" value="Jan 2026" readOnly />
                            </div>
                        </div>

                        <div className="profile-actions">
                            <button className="secondary-btn">Edit Profile</button>
                            <button className="danger-btn" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
