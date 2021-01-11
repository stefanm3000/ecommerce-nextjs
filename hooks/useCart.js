import { useState, useEffect } from "react";

const useCart = () => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const initialCart = getInitialCart();
    if (initialCart) {
      setCart(initialCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (id, quantity = 1) => {
    const item = cart.find((i) => i.id === id);

    if (item) {
      item.quantity += quantity;
      setCart([...cart]);
    } else {
      setCart([...cart, { id, quantity }]);
    }
  };

  const removeItemFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  return {
    cart,
    addItemToCart,
    removeItemFromCart,
  };
};

export default useCart;
