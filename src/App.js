import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

//Contexts
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin

    setCart([...cart, item]);
  };

  // const removeItem = (id) => {
  //   setCart(cart.filter((item) => item.id !== id));
  // };
  const removeItem = (id) => {
    const newCart = [...cart];
    const indexToRemove = newCart.findIndex((item) => item.id === id);

    newCart.splice(indexToRemove, 1);

    setCart(newCart);
  };

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, removeItem }}>
        <ProductContext.Provider value={{ products, addItem }}>
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </ProductContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
