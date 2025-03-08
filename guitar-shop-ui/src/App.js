import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Customers from "./pages/Customers";
import Repairs from "./pages/Repairs";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import ManageGuitars from "./pages/ManageGuitars";
import LoginPage from "./pages/LoginPage";

const PrivateRoute = ({ element, roleRequired }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />; // Redirect if not logged in
  if (roleRequired && userRole !== roleRequired) return <Navigate to="/" />; // Redirect if role doesn’t match

  return element;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
        <Route path="/customers/new" element={<PrivateRoute element={<Customers />} />} />
        <Route path="/repairs/new" element={<PrivateRoute element={<Repairs />} />} />
        <Route path="/manage-guitars" element={<PrivateRoute element={<ManageGuitars />} roleRequired="ROLE_ADMIN" />} />
      </Routes>
    </Router>
  );
}

export default App;
