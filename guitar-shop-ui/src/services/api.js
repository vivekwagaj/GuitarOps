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

