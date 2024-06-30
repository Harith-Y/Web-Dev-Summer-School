import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <h1>InstiOLX</h1>
    <nav>
      <Link to="/">Sell</Link>
      <Link to="/buy">Buy</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  </header>
);

export default Header;
