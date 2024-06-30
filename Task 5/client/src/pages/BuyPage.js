import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchProducts } from "../services/api";

const BuyPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Buying Date: {product.buyingDate}</p>
              <p>Buying Price: {product.buyingPrice}</p>
              <p>Phone Number: {product.phoneNumber}</p>
              <p>Location: {product.location}</p>
              <div>
                {product.photos.map((photo) => (
                  <img
                    key={photo}
                    src={`http://localhost:5000/uploads/${photo}`}
                    alt={product.title}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default BuyPage;
