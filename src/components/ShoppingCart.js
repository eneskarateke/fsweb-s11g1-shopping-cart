import React, { useContext } from "react";
import { ScCartCheckout } from "./scParts";
import { CartContext } from "../contexts/CartContext";

// Components
import Item from "./ShoppingCartItem";

const ShoppingCart = (props) => {
  const { cart } = useContext(CartContext);
  const getCartTotal = () => {
    return cart
      .reduce((acc, value) => {
        return acc + value.price;
      }, 0)
      .toFixed(2);
  };

  return (
    <div>
      {cart.map((item, index) => (
        <Item key={index + "_" + item.id} {...item} />
      ))}

      <ScCartCheckout>
        <p>Total: ${getCartTotal()}</p>
        <button>Checkout</button>
      </ScCartCheckout>
    </div>
  );
};

export default ShoppingCart;
