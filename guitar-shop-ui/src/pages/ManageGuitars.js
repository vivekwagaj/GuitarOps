import React, { useEffect, useState } from "react";
import { fetchGuitars, addGuitar, updateGuitar, deleteGuitar } from "../services/api";

const ManageGuitars = () => {
  const [guitars, setGuitars] = useState([]);
  const [formData, setFormData] = useState({ brand: "", model: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadGuitars();
  }, []);

  const loadGuitars = async () => {
    const data = await fetchGuitars();
    setGuitars(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateGuitar(editId, formData);
    } else {
      await addGuitar(formData);
    }
    setFormData({ brand: "", model: "" });
    setEditId(null);
    loadGuitars();
  };

  const handleEdit = (guitar) => {
    setFormData({ brand: guitar.brand, model: guitar.model });
    setEditId(guitar.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this guitar?")) {
      await deleteGuitar(id);
      loadGuitars();
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Manage Guitars</h1>

      {/* Guitar Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded max-w-md mx-auto">
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          className="border p-2 w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update Guitar" : "Add Guitar"}
        </button>
      </form>

      {/* Guitar List */}
      <table className="w-full border-collapse border border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Brand</th>
            <th className="border border-gray-300 p-2">Model</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guitars.map((guitar) => (
            <tr key={guitar.id} className="text-center">
              <td className="border border-gray-300 p-2">{guitar.brand}</td>
              <td className="border border-gray-300 p-2">{guitar.model}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleEdit(guitar)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(guitar.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {guitars.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No guitars available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageGuitars;
