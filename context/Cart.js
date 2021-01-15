import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const Cart = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const initialCart = getInitialCart();
    if (initialCart) {
      setCart(initialCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    let newTotal = 0;

    cart.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal);

    let newTotalQty = 0;

    cart.forEach((item) => {
      newTotalQty += item.quantity;
    });
    setTotalQuantity(newTotalQty);
  }, [cart]);

  const addItemToCart = (product, quantity = 1) => {
    const item = cart.find((i) => i.id === product.id);

    if (item) {
      item.quantity += quantity;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeOneFromQuantity = (product, quantity = 1) => {
    const item = cart.find((i) => i.id === product.id);

    if (item) {
      if (item.quantity >= 1) {
        item.quantity -= quantity;
        setCart([...cart]);
      }
      if (item.quantity === 0) {
        removeItemFromCart(product.id);
      }
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeItemFromCart = (ident) => {
    const newCart = cart.filter((item) => {
      return item.id !== ident;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
    openCart,
    closeCart,
    isOpen,
    total,
    clearCart,
    totalQuantity,
    removeOneFromQuantity,
  };

  return (
    <Context.Provider value={exposed}>
      <div>{children}</div>
    </Context.Provider>
  );
};

export default Cart;
