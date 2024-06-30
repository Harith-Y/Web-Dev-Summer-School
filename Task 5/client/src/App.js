import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SellPage from "./pages/SellPage";
import BuyPage from "./pages/BuyPage";
import CartPage from "./pages/CartPage";
import "./styles.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SellPage />} />
        <Route path="/buy" element={<BuyPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
};

export default App;
