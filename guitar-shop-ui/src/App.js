import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Customers from "./pages/Customers"
import Repairs from "./pages/Repairs"
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import ManageGuitars from "./pages/ManageGuitars"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/customers/new" element={<Customers />} />
        <Route path="/repairs/new" element={<Repairs />} />
        <Route path="/manage-guitars" element={<ManageGuitars />}/>

      </Routes>
    </Router>
  );
}

export default App;
