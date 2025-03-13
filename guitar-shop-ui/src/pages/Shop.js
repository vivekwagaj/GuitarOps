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
        try {
          const response = await fetch("http://localhost:8080/api/parts");
          const data = await response.json();
          console.log("🛠️ Fetched Parts Data:", JSON.stringify(data, null, 2));  // 🔥 Print fetched parts
          setParts(data);
        } catch (err) {
          console.error("Failed to fetch parts:", err);
        }
      };

    fetchGuitars();
    fetchParts();
  }, []);

  const handleAddToCart = (item, isPart) => {
      const cartItem = {
        id: item.id,
        name: isPart ? item.name : `${item.brand} - ${item.model}`,  // 🔥 Properly set the name
        price: item.price,
        quantity: 1,
        guitar: !isPart ? { id: item.id , brand: item.brand, model: item.model, price: item.price } : null,   // ✅ Correct way to set guitar ID
        guitarpart: isPart ? { id: item.id, name: item.name, price: item.price  } : null,  // ✅ Correct way to set part ID
      };
      addToCart(cartItem);  // ✅ Use the context function
      alert("Added to cart!");
    };

    const handleAddPartToCart = (part) => {
      const cartItem = {
        id: part.id,
        name: part.name,  // ✅ Properly set the part name
        price: part.price,
        quantity: 1,
        guitar: null,  // 🔥 Explicitly set guitar as null
        guitarpart: { id: part.id, name: part.name, price: part.price  },  // ✅ Set part ID correctly
      };
      addToCart(cartItem);  // ✅ Use the context function
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
            onClick={() => handleAddPartToCart(part)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Shop;
