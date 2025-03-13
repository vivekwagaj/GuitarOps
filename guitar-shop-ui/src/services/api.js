import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Adjust if needed

// Guitar APIs
export const fetchGuitars = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guitars`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guitars:", error);
    return [];
  }
};

export const addGuitar = async (guitar) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/guitars`,guitar);
    return response.data;
  } catch (error) {
    console.error("Error adding guitars:", error);
    throw error;
  }
};

export const updateGuitar = async (id, guitar) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/guitars/${id}`, guitar);
    return response.data;
  } catch (error) {
    console.error("Error updating guitar:", error);
    throw error;
  }
};

// Delete a guitar
export const deleteGuitar = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/guitars/${id}`);
  } catch (error) {
    console.error("Error deleting guitar:", error);
    throw error;
  }
};

// Customer APIs
export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Repair APIs
export const createRepairRequest = async (repairData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/repairs`, repairData);
    return response.data;
  } catch (error) {
    console.error("Error creating repair request:", error);
    throw error;
  }
};

export const addToCart = async (customerId, item) => {
  if (!customerId) {
    console.error("Customer ID is not available");
    return;
  }
  console.log("🚀 Adding to Cart (API):", JSON.stringify(item, null, 2));
  const response = await fetch(`http://localhost:8080/api/cart/${customerId}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error(`Failed to add to cart: ${response.statusText}`);
  }

  return response.json();
};

export const getCart = async (customerId) => {
  if (!customerId) {
    console.error("Customer ID is not available");
    return;
  }
  const response = await fetch(`http://localhost:8080/api/cart/${customerId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const checkout = async (customerId) => {
  const response = await fetch(`http://localhost:8080/api/cart/checkout/${customerId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const removeFromCartAPI = async (customerId, itemId) => {
  const response = await fetch(`http://localhost:8080/api/cart/${customerId}/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id: itemId }),
  });
  if (!response.ok) {
    throw new Error("Failed to remove item from cart");
  }
};

export const clearCartAPI = async (customerId) => {
  const response = await fetch(`http://localhost:8080/api/cart/${customerId}/clear`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to clear cart: ${response.statusText}`);
  }

};