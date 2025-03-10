import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    window.location.reload();
    };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Guitar Shop</h1>
      <div>
        <Link className="mx-2" to="/">Home</Link>
        <Link className="mx-2" to="/shop">Shop</Link>
        {token ? (
                <>
        <Link className="mx-2" to="/cart">Cart</Link>
        {role === "ROLE_ADMIN" && <Link className="mx-2" to="/customers/new">Customers</Link>}
        <Link className="mx-2" to="/repairs/new">Repairs</Link>
        <Link to="/profile">My Profile</Link>
        {role === "ROLE_ADMIN" && <Link className="mx-2" to="/manage-guitars">Manage Guitars(Admin Only)</Link>} {/* Admin Only */}
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register" className="ml-4">Register</Link>
                </>
              )}
      </div>
    </nav>
  );
};

export default Navbar;
