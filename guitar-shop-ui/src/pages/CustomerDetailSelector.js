import React, { useState, useEffect } from "react";

const InfoSelector = ({ label, options, onSave, onSelect }) => {
  const [isNew, setIsNew] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setIsNew(true);
      onSelect("");
    } else {
      setIsNew(false);
      onSelect(value);
    }
  };

  const handleSave = () => {
    if (newValue.trim() !== "") {
      onSave(newValue);
      setIsNew(false);
      onSelect(newValue);
      setNewValue("");
    }
  };

  return (
    <div className="w-full p-2 border rounded mb-4">
      <label className="block font-medium mb-2">{label}</label>
      <select
        className="w-full p-2 border rounded mb-2"
        onChange={handleSelect}
        defaultValue=""
      >
        <option value="" disabled>
          Select or enter a new {label.toLowerCase()}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        <option value="new">Enter New {label}</option>
      </select>

      {isNew && (
        <div className="mt-2">
          <input
            type="text"
            placeholder={`Enter new ${label.toLowerCase()}`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            className="mt-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save {label}
          </button>
        </div>
      )}
    </div>
  );
};

const CustomerDetailSelector = ({ selectedPhone, setSelectedPhone, selectedAddress, setSelectedAddress }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const savedPhones = JSON.parse(localStorage.getItem("phoneNumbers")) || [];
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setPhoneNumbers(savedPhones);
    setAddresses(savedAddresses);
  }, []);

  const savePhoneNumber = (number) => {
    const updatedPhones = [...phoneNumbers, number];
    setPhoneNumbers(updatedPhones);
    localStorage.setItem("phoneNumbers", JSON.stringify(updatedPhones));
  };

  const saveAddress = (address) => {
    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  return (
    <>
      <InfoSelector
        label="Phone Number"
        options={phoneNumbers}
        onSave={savePhoneNumber}
        onSelect={setSelectedPhone}
      />
      <InfoSelector
        label="Address"
        options={addresses}
        onSave={saveAddress}
        onSelect={setSelectedAddress}
      />
    </>
  );
};

export default CustomerDetailSelector;
