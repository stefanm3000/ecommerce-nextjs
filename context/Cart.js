import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const Cart = ({ children }) => {
    
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

  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
  };

  return (
    <Context.Provider value={exposed}>
      <div>{children}</div>
    </Context.Provider>
  );
};

export default Cart;
