import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPrice, clearCart, removeFromCart } = useCart();
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


 useEffect(() => {
     const fetchCustomerData = async () => {
       const customerId = localStorage.getItem("customerId");
       try {
         const response = await fetch(`http://localhost:8080/api/customers/${customerId}`, {
           method: "GET",
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         });

         if (!response.ok) {
           throw new Error("Failed to fetch customer data");
         }

         const customer = await response.json();
         setPhoneNumbers(customer.phoneNumbers || []);
         setAddresses(customer.addresses || []);
       } catch (err) {
         console.error("Error fetching customer data:", err);
       }
     };

     fetchCustomerData();
   }, []);

  // 📝 Handle Checkout
  const handleCheckout = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Prepare phone number and address lists
      const phoneNumberList = phoneNumbers.map((number) => ({
                                                             id: number.id || null,
                                                             number: number.number || number,  // Handle both object and plain string cases
                                                           }));
      const addressList = addresses.map((address) => ({
        streetAddress: address.streetAddress,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
      }));

      const customerId = localStorage.getItem("customerId");
      const response = await fetch(`http://localhost:8080/api/cart/checkout/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          phoneNumbers: phoneNumberList,
          addresses: addressList,
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      alert("Checkout successful!");
      clearCart();
      navigate("/");
    } catch (err) {
      setMessage(`❌ Checkout failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 📝 Handle Remove Item
  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
  };

  // 📝 Handle Adding New Phone Number
  const handleAddPhoneNumber = () => {
    if (phoneNumber.trim() !== "") {
      setPhoneNumbers([...phoneNumbers, phoneNumber]);
      setPhoneNumber("");
    }
  };

  // 📝 Handle Adding New Address
  const handleAddAddress = () => {
    const newAddress = {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    };
    setAddresses([...addresses, newAddress]);
  };

  // 📝 Handle Address Change
  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
          <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="py-2 flex justify-between items-center">
                <span className="font-medium">
                  {item.guitar
                    ? `${item.guitar.brand} - ${item.guitar.model}`
                    : item.guitarpart
                    ? item.guitarpart.name
                    : item.name}
                </span>
                <span>Qty: {item.quantity}</span>
                <span>${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* 📝 Phone Number Selection */}
          <h4 className="text-lg font-semibold mt-4">Select Phone Number</h4>
          <select
            value={selectedPhone}
            onChange={(e) => setSelectedPhone(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select a Phone Number</option>
            {phoneNumbers.map((number, index) => (
              <option key={index} value={number.number}>
                {number.number}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleAddPhoneNumber}
            className="bg-blue-500 text-white py-2 rounded w-full mb-4"
          >
            Add Phone Number
          </button>

          {/* 📝 Address Selection */}
          <h4 className="text-lg font-semibold mt-4">Select Address</h4>
          <select
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select an Address</option>
            {addresses.map((address, index) => (
              <option key={index} value={index}>
                {`${address.streetAddress}, ${address.city}, ${address.state} - ${address.zipCode}, ${address.country}`}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddAddress}
            className="bg-blue-500 text-white py-2 rounded w-full mb-2"
          >
            Add New Address
          </button>

          {/* 📍 New Address Fields */}
          {addresses.map((address, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Street Address"
                value={address.streetAddress}
                onChange={(e) =>
                  handleAddressChange(index, "streetAddress", e.target.value)
                }
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  handleAddressChange(index, "city", e.target.value)
                }
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                  handleAddressChange(index, "state", e.target.value)
                }
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={(e) =>
                  handleAddressChange(index, "zipCode", e.target.value)
                }
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="Country"
                value={address.country}
                onChange={(e) =>
                  handleAddressChange(index, "country", e.target.value)
                }
                className="w-full p-2 border rounded mb-1"
              />
            </div>
          ))}


          {/* 📝 Payment Method */}
          <h4 className="text-lg font-semibold mt-4">Select Payment Method</h4>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
          </select>

          {/* 📝 Total Price and Checkout Button */}
          <div className="mt-4 border-t pt-4">
            <p className="text-lg font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Confirm Checkout"}
            </button>
            {message && (
              <p className="mt-4 text-red-500 text-center">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
