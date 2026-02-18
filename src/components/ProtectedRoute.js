import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({role }) {
    const { currentUser, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!currentUser) {
        return <Navigate to="/login" replace />
    }
    if (role && currentUser.role !== role) {
        return <Navigate to="/" replace />;
    }

    return (<Outlet/>)
}