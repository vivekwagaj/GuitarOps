import React, { createContext, useContext, useState, useEffect } from "react";
import { addToCart as addToCartAPI, clearCartAPI, getCart, checkout, removeFromCartAPI } from "../services/api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch the cart from the backend on mount
  const fetchCart = async () => {
    const customerId = localStorage.getItem("customerId");
    try {
      const data = await getCart(customerId);
      setCart(data.items || []);
      setTotalPrice(data.totalPrice || 0);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart function
  const addToCart = async (item) => {

    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      alert("Customer ID not found. Please log in again.");
      return;
    }

    try {
      // Check if the item already exists in the cart
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += item.quantity;
        existingItem.price += item.price * item.quantity;
        // Update the backend with the new quantity and price
        await addToCartAPI(customerId, existingItem);
      } else {
        // Add new item to the cart
        await addToCartAPI(customerId, item);
      }

      await fetchCart(); // Refresh the cart
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };


const removeFromCart = async (itemId) => {
  const customerId = localStorage.getItem("customerId");
  if (!customerId) {
    alert("Customer ID not found. Please log in again.");
    return;
  }

  try {
    // Remove from backend
    await removeFromCartAPI(customerId, itemId);

    // Update the cart in frontend
    setCart((prevCart) => {
          const updatedCart = prevCart
              .map((item) => {
                        if (item.id === itemId) {
                          if (item.quantity > 1) {
                            // Decrement quantity and update price if more than 1
                            const updatedItem = {
                              ...item,
                              quantity: item.quantity - 1,
                              price: (item.price / item.quantity) * (item.quantity - 1), // 🔥 Adjust item price
                            };
                            return updatedItem;
                          }
                          // Remove item if quantity becomes 0
                          return null;
                        }
                        return item;
                      })
              .filter(Boolean); // Remove any null values from the list

          // Update the total price
          const updatedTotalPrice = updatedCart.reduce(
            (total, item) => total + item.price,
            0
          );
          setTotalPrice(updatedTotalPrice);

          return updatedCart;
        });

        console.log("Item removed from cart");
  } catch (err) {
    console.error("Failed to remove from cart:", err);
  }
};

  // Checkout function
  const handleCheckout = async () => {
    const customerId = localStorage.getItem("customerId");
    await checkout(customerId);
    setCart([]);
    setTotalPrice(0);
    alert("Checkout successful!");
  };


  const clearCart = async () => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      console.error("Customer ID not found");
      return;
    }

    try {
      await clearCartAPI(customerId);  // 🔥 Clear the cart from the backend
      setCart([]);  // Clear the frontend state
      setTotalPrice(0);
      console.log("Cart cleared successfully");
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };


  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart, handleCheckout, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
