import React from "react";

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-gray-600">${price}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;