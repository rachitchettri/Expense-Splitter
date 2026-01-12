import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅
import { useAuth } from "./hooks/useAuth";
import AddExpense from "./pages/Expenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";

function PrivateRoute({ children }) {
  const { auth } = useAuth();
  return auth?.token ? children : <Navigate to="/login" />;
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
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<AddExpense />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
