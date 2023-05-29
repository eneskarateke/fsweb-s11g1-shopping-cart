import { createContext } from "react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);

  const addItem = (item) => {
    setCart([...cart, item]);
    console.log("addItem", item, cart);
  };

  const removeItem = (id) => {
    const newCart = [...cart];
    const indexToRemove = newCart.findIndex((item) => item.id === id);
    console.log(
      "removeItemPRE",
      "id",
      id,
      "indexToRemove",
      indexToRemove,
      newCart
    );
    // modifiye edilen arrayi döndük
    newCart.splice(indexToRemove, 1);
    setCart(newCart);
    console.log(
      "removeItemPOST",
      "id",
      id,
      "indexToRemove",
      indexToRemove,
      newCart
    );
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const CartContext = createContext();
export default CartContextProvider;
