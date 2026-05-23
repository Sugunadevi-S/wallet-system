import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddMoney from "./pages/AddMoney";
import TransferMoney from "./pages/transferMoney";
import Layout from "./component/Layout";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Layout */}
        <Route element={isAuthenticated ? <Layout /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-money" element={<AddMoney />} />
          <Route path="/transfer-money" element={<TransferMoney />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
