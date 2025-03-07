import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Guitar Shop</h1>
      <div>
        <Link className="mx-2" to="/">Home</Link>
        <Link className="mx-2" to="/shop">Shop</Link>
        <Link className="mx-2" to="/cart">Cart</Link>
        <Link className="mx-2" to="/customers/new">Customers</Link>
        <Link className="mx-2" to="/repairs/new">Repairs</Link>
        <Link className="mx-2" to="/manage-guitars">Manage Guitars(Admin Only)</Link>
      </div>
    </nav>
  );
};

export default Navbar;
