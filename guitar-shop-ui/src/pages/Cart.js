import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart = [], totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const customerId = localStorage.getItem("customerId"); // 🔥 Fetch customer ID
      console.log("🛒 Cart data before checkout:", cart);

      const response = await fetch(`http://localhost:8080/api/cart/checkout/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ items: cart }),  // 🔥 Pass the cart data to the backend
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
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
          <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
          <ul className="space-y-2">
            {cart.map((item, index) => {
              let itemName = "Unknown Item";

              // Improved item name extraction
              if (item.guitar) {
                itemName = `${item.guitar.brand} ${item.guitar.model}`;
              } else if (item.guitarPart) {
                itemName = item.guitarPart.name;
              } else if (item.name) {
                itemName = item.name;
              }

              return (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <span className="font-medium">{itemName}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>${item.price?.toFixed(2) || "0.00"}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 border-t pt-4">
            <p className="text-lg font-semibold">Total: ${totalPrice?.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Confirm Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
