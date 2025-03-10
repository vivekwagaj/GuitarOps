import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createRepairRequest } from "../services/api"; // API function

// Validation Schema
const repairSchema = yup.object().shape({
  issue: yup.string().required("Issue is required"),
  description: yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
  resolved: yup.boolean(),
});

const RepairForm = () => {
  const role = localStorage.getItem("role"); // Get user role

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(repairSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createRepairRequest(data);
      alert("Repair request submitted successfully!");
      reset();
    } catch (error) {
      alert("Failed to submit repair request");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Repair Request</h2>

      <input
        type="text"
        {...register("issue")}
        placeholder="Issue"
        className="border p-2 w-full mb-2"
      />
      <p className="text-red-500 text-sm">{errors.issue?.message}</p>

      <textarea
        {...register("description")}
        placeholder="Describe the problem"
        className="border p-2 w-full mb-2"
      />
      <p className="text-red-500 text-sm">{errors.description?.message}</p>

      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register("resolved")} className="h-4 w-4" disabled={role === "ROLE_USER"} />
        <span className={role === "ROLE_USER" ? "text-gray-500" : ""}>
          Mark as resolved (For technicians only)
        </span>
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Submit
      </button>
    </form>
  );
};

export default RepairForm;
