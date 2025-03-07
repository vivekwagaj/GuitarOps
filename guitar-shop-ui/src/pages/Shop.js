import React, { useEffect, useState } from "react";
import { fetchGuitars } from "../services/api";

const Shop = () => {
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    async function loadGuitars() {
      const data = await fetchGuitars();
      setGuitars(data);
    }
    loadGuitars();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Available Guitars</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Brand</th>
            <th className="border border-gray-300 p-2">Model</th>
          </tr>
        </thead>
        <tbody>
          {guitars.length > 0 ? (
            guitars.map((guitar) => (
              <tr key={guitar.id} className="text-center">
                <td className="border border-gray-300 p-2">{guitar.brand}</td>
                <td className="border border-gray-300 p-2">{guitar.model}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-4">
                No guitars available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Shop;
