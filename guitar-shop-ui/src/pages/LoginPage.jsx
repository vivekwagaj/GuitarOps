import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      const decodedToken = (() => {
                             try {
                               return JSON.parse(atob(data.token.split(".")[1]));
                             } catch (err) {
                               console.error("❌ Error decoding token:", err.message);
                               return null;
                             }
                           })();
      console.log("✅ Decoded Token:", decodedToken); // Debugging

      const roles = decodedToken?.roles || [];
      const userRole = roles.includes("ROLE_ADMIN")
       ? "ROLE_ADMIN"
       : roles.includes("ROLE_TECHNICIAN")
       ? "ROLE_TECHNICIAN"
       : "ROLE_USER"; // Default role

      localStorage.setItem("role", userRole); // Store user role
      localStorage.setItem("username", decodedToken.sub); // 🔥 Store the username (email)
      setSuccess(true);
      setTimeout(() => {
              navigate("/");
              window.location.reload(); // Refresh to apply changes
              }, 500);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Guitar.jpg')" }} // 🔥 Same background as Home
        >


      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {success && <p className="text-green-500 text-center">✅ Login Successful! Redirecting...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>

    </div>
  );
};

export default LoginPage;
