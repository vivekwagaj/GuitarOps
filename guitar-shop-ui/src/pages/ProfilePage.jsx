import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/customers/me", {
      method: "GET",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          My Profile
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {profile ? (
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Personal Details
              </h3>
              <p><strong>First Name:</strong> {profile.firstName}</p>
              <p><strong>Last Name:</strong> {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </div>

            {/* Addresses */}
            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-700">Addresses</h3>
              {profile.addresses && profile.addresses.length > 0 ? (
                <ul className="list-disc list-inside">
                  {profile.addresses.map((address, index) => (
                    <li key={index}>
                      {address.street}, {address.city}, {address.state}, {address.zipCode}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No addresses found.</p>
              )}
            </div>

            {/* Phone Numbers */}
            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Phone Numbers
              </h3>
              {profile.phoneNumbers && profile.phoneNumbers.length > 0 ? (
                <ul className="list-disc list-inside">
                  {profile.phoneNumbers.map((phone, index) => (
                    <li key={index}>{phone.number}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No phone numbers found.</p>
              )}
            </div>

            {/* Orders */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Orders</h3>
              {profile.orders && profile.orders.length > 0 ? (
                <ul className="space-y-2">
                  {profile.orders.map((order) => (
                    <li key={order.id} className="p-2 border rounded">
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Status:</strong> {order.status}</p>
                      <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No orders found.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
