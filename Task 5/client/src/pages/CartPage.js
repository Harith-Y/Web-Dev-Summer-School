import React from "react";
import Cart from "../components/Cart";

const CartPage = ({ cartItems }) => (
  <div>
    <Cart cartItems={cartItems} />
  </div>
);

export default CartPage;
