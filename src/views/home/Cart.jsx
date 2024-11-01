import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.uniqueKey}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1 px-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500">Author: {item.author}</p>
                <p className="text-gray-800 font-bold">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    updateQuantity(item.uniqueKey, item.quantity - 1)
                  }
                  className="px-2 py-1 text-xl font-bold bg-gray-300 rounded-l"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.uniqueKey, Number(e.target.value))
                  }
                  className="w-12 text-center border border-gray-300"
                />
                <button
                  onClick={() =>
                    updateQuantity(item.uniqueKey, item.quantity + 1)
                  }
                  className="px-2 py-1 text-xl font-bold bg-gray-300 rounded-r"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.uniqueKey)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <div className="text-right font-semibold text-xl mt-4">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
