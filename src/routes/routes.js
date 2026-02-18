import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import CreateCard from "../components/CreateCard";
import Profile from "../pages/Profile";
import AdminPanel from "../pages/AdminPanel";
import Register from "../pages/Register";
import Bookmarks from "../pages/Bookmarks";
import MyLearning from "../pages/MyLearning";
import ViewCard from "../components/ViewCard";
import EditCard from "../components/EditCard";

export default function AppRoutes() {

    return (<>
        <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/create" element={<CreateCard />} />
                <Route path="/card/:id" element={<ViewCard />} />
                <Route path="/edit/:id" element={<EditCard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/mylearning" element={<MyLearning />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Only Route */}
            <Route element={<ProtectedRoute role="admin" />}>
                <Route path="/admin" element={<AdminPanel />} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
    </>)
}