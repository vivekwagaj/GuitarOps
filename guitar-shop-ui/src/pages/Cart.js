import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      // Get the currently logged-in user's email from localStorage
      const email = localStorage.getItem("username");

      // Fetch the customer ID using the email
      const customerResponse = await fetch(`http://localhost:8080/api/customers/email/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!customerResponse.ok) {
        throw new Error("Failed to get customer ID");
      }

      const customer = await customerResponse.json();
      const customerId = customer.id;

      // Proceed with checkout
      const response = await fetch(`http://localhost:8080/api/cart/checkout/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      alert("Checkout successful!");
      clearCart();
      navigate("/");
    } catch (err) {
      alert("Checkout failed: " + err.message);
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between p-2 border-b">
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <h3 className="text-xl font-bold mt-4">Total: ${totalPrice}</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
