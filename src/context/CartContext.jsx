import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    setCartItems((prevItems) => [
      ...prevItems,
      { ...book, quantity: 1, uniqueKey: Date.now() }, // Each item has a unique key
    ]);
  };

  const removeFromCart = (uniqueKey) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.uniqueKey !== uniqueKey)
    );
  };

  const updateQuantity = (uniqueKey, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueKey === uniqueKey
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
