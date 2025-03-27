import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, totalPrice,  removeFromCart,  clearCart } = useCart();

    const navigate = useNavigate();

    const checkOut = () => {

                         navigate("/checkout");
                       };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                    <button onClick={() => navigate('/shop')} className="bg-blue-500 text-white py-2 px-4 rounded">Go to Shop</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h2 className="text-4xl font-bold text-center mb-6">Your Cart</h2>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
                {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 mb-3 bg-gray-50 rounded">
                        <div>
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <button className="text-red-500 hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                ))}
                <div className="text-right text-xl font-semibold mt-4">Total: ${totalPrice.toFixed(2)}</div>
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={clearCart} className="bg-red-500 text-white py-2 px-4 rounded">Clear Cart</button>
                    <button onClick={checkOut} className="bg-green-500 text-white py-2 px-4 rounded">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
