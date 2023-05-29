import { createContext, useContext } from "react";
import { useState } from "react";
import { data } from "../data";

import { CartContext } from "./CartContext";
import useLocalStorage from "../hooks/useLocalStorage";

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useLocalStorage("products", data);
  // const [products, setProducts] = useState(data);
  const { addItem } = useContext(CartContext);

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      {children}
    </ProductContext.Provider>
  );
};

export const ProductContext = createContext();
export default ProductContextProvider;
