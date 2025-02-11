import React from "react";

const Cart = ({ cartItems }) => (
  <div>
    <h2>Your Cart</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.title} - ${item.price}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Cart;
