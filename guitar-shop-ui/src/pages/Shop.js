import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const Shop = () => {
  const [guitars, setGuitars] = useState([]);
  const [parts, setParts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchGuitars = async () => {
      const response = await fetch("http://localhost:8080/api/guitars");
      const data = await response.json();
      setGuitars(data);
    };
    const fetchParts = async () => {
      const response = await fetch("http://localhost:8080/api/parts");
      const data = await response.json();
      setParts(data);
    };

    fetchGuitars();
    fetchParts();
  }, []);

  const handleAddToCart = (item, isPart) => {
    const cartItem = {
      id: item.id,
      name: isPart ? item.name : `${item.brand} - ${item.model}`,  // 🔥 Fix: Properly set the name
      price: item.price,
      quantity: 1,
    };
    addToCart(cartItem);
    alert("Added to cart!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shop</h2>
      <h3 className="text-xl font-bold mb-2">Guitars</h3>
      {guitars.map((guitar) => (
        <div key={guitar.id} className="flex justify-between p-2 border-b">
          <span>{guitar.brand} - {guitar.model}</span>
          <span>${guitar.price}</span>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => handleAddToCart(guitar)}
          >
            Add to Cart
          </button>
        </div>
      ))}
      <h3 className="text-xl font-bold mt-4 mb-2">Parts</h3>
      {parts.map((part) => (
        <div key={part.id} className="flex justify-between p-2 border-b">
          <span>{part.name}</span>
          <span>${part.price}</span>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => handleAddToCart(part)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Shop;
