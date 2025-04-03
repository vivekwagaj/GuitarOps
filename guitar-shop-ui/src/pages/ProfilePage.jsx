import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [expandedOrders, setExpandedOrders] = useState({});
  const [visibleOrders, setVisibleOrders] = useState(3); // Controls visible order count

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

  const toggleOrder = (orderId) => {
      setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };


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

            {/* Orders Section */}
            <h3 className="text-xl font-bold mt-4">Previous Orders</h3>
            <div className="max-h-[300px] overflow-y-auto">
              <OrderList
                orders={profile.orders.slice(0, visibleOrders)}
                expandedOrders={expandedOrders}
                toggleOrder={toggleOrder}
              />
            </div>

            {/* Show More/Less Orders */}
            {profile.orders.length > 3 && (
              <button
                onClick={() => setVisibleOrders(visibleOrders === 3 ? profile.orders.length : 3)}
                className="text-blue-500 hover:underline mt-2"
              >
                {visibleOrders === 3 ? "Show More Orders" : "Show Less Orders"}
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-600 text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

// ✅ Extracted ProfileSection for reuse
const ProfileSection = ({ title, children }) => (
  <div className="border-b pb-4">
    <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
    {children}
  </div>
);

// ✅ Extracted OrderList for cleaner JSX
const OrderList = ({ orders, expandedOrders, toggleOrder }) => {
  if (!orders.length) return <p className="text-gray-500">No orders found.</p>;

  return orders.map((order) => (
    <div key={order.id} className="border rounded bg-gray-100 w-full mt-2">
      {/* Order Header */}
      <button
        onClick={() => toggleOrder(order.id)}
        className="w-full text-left p-4 flex justify-between items-center bg-gray-200 hover:bg-gray-300 transition-all rounded-t"
      >
        <span>
          <strong>Order ID:</strong> {order.id} -
          <strong> Status:</strong> {order.orderStatus} -
          <strong> Total:</strong> ${order.totalPrice.toFixed(2)}
        </span>
        <span>{expandedOrders[order.id] ? "▲" : "▼"}</span>
      </button>

      {/* Order Details (Collapsible) */}
      {expandedOrders[order.id] && (
        <div className="p-4">
          <h4 className="font-bold">Items:</h4>
          <ul className="list-disc pl-5">
            {order.items.map((item) => (
              <li key={item.id}>{getItemDescription(item)} ({item.quantity}x)</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ));
};

// ✅ Helper function for item descriptions
const getItemDescription = (item) => {
  if (item.guitar) return `🎸 ${item.guitar.brand} ${item.guitar.model} - $${item.price}`;
  if (item.guitarpart) return `🛠 ${item.guitarpart.name} - $${item.price}`;
  return `❓ Unknown Item - $${item.price}`;
};

export default ProfilePage;
