import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCustomer } from "../services/api"; // Import API function

// Validation Schema
const customerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const CustomerForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createCustomer(data);
      alert("Customer created successfully!");
      reset();
    } catch (error) {
      alert("Failed to create customer");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Customer</h2>

      <input
        type="text"
        {...register("firstName")}
        placeholder="First Name"
        className="border p-2 w-full mb-2"
      />
      <p className="text-red-500 text-sm">{errors.firstName?.message}</p>

      <input
        type="text"
        {...register("lastName")}
        placeholder="Last Name"
        className="border p-2 w-full mb-2"
      />
      <p className="text-red-500 text-sm">{errors.lastName?.message}</p>

      <input
        type="email"
        {...register("email")}
        placeholder="Email"
        className="border p-2 w-full mb-2"
      />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Submit
      </button>
    </form>
  );
};

export default CustomerForm;
