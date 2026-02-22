import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import AppLayout from "./layout/AppLayout";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import RoomPlanner from "./pages/RoomPlanner";

function PrivateRoute({ children }) {
  const { auth } = useAuth();
  return auth?.token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/otp" element={<OTPVerification />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="rooms" element={<RoomPlanner />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
