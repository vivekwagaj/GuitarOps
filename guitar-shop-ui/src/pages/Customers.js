import React from "react";
import CustomerForm from "../components/CustomerForm";

const Customers = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Manage Customers</h1>
      <CustomerForm />
    </div>
  );
};

export default Customers;

