import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const existingBook = (book) => {
    return cart.find((item) => item.id === book.id);
  };

  const addToCart = (book) => {
    if (existingBook(book)) {
      setCart(
        cart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (book) => {
    if (existingBook(book) && book.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== book.id));
    }
  };

  const cleanCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPriceCart = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.saleInfo?.listPrice?.amount ?? 0;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cleanCart,
        getCartTotal,
        totalItems: getCartTotal(),
        totalPrice: getTotalPriceCart(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
