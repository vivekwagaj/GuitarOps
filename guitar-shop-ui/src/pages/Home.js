import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center p-10 bg-cover bg-top bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('images/Guitar.jpg')" }}
    >
     <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-white text-center p-10">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Guitar-Ops</h1>
          <p className="text-lg mb-6 max-w-2xl">
            Your one-stop shop for buying, selling, and repairing guitars. Find the perfect guitar for your sound.
          </p>
          <Link to="/shop">
            <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:bg-yellow-500 transition-all">
              Shop Now
            </button>
          </Link>
        </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
        {[
          { title: "Buy Guitars", desc: "Find a variety of premium guitars at the best prices.", img: "/images/buy.jpeg" },
          { title: "Sell Your Guitar", desc: "Trade in or sell your guitar easily with us.", img: "/images/sell.jpeg" },
          { title: "Repair Services", desc: "Professional guitar repair services to keep your instrument in top shape.", img: "/images/repair.jpg" }
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-cover bg-center text-white rounded-lg shadow-md text-center flex items-center justify-center h-40"
            style={{ backgroundImage: `url(${feature.img})` }}
          >
            <div className="bg-black bg-opacity-50 p-4 rounded">
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
