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

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <CartContext.Provider value={cart}>
        <ProductContext.Provider value={{ products, addItem }}>
          <Navigation />
        </ProductContext.Provider>
      </CartContext.Provider>

      {/* Routelar */}
      <main className="content">
        <Route exact path="/">
          <CartContext.Provider value={cart}>
            <ProductContext.Provider value={{ products, addItem }}>
              <Products />
            </ProductContext.Provider>
          </CartContext.Provider>
        </Route>

        <Route path="/cart">
          <CartContext.Provider value={{ cart, removeItem }}>
            <ProductContext.Provider value={{ products, addItem }}>
              <ShoppingCart />
            </ProductContext.Provider>
          </CartContext.Provider>
        </Route>
      </main>
    </div>
  );
}

export default App;
