import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    buyingDate: "",
    buyingPrice: "",
    phoneNumber: "",
    location: "",
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "photos") {
        Array.from(formData.photos).forEach((photo) =>
          data.append("photos", photo)
        );
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create product.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sell Your Item</h2>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" onChange={handleChange} />
      <br />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        onChange={handleChange}
      />
      <br />
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" name="price" onChange={handleChange} />
      <br />
      <label htmlFor="buyingDate">Buying Date:</label>
      <input
        type="date"
        id="buyingDate"
        name="buyingDate"
        onChange={handleChange}
      />
      <br />
      <label htmlFor="buyingPrice">Buying Price:</label>
      <input
        type="text"
        id="buyingPrice"
        name="buyingPrice"
        onChange={handleChange}
      />
      <br />
      <label htmlFor="photos">Upload Multiple Photos:</label>
      <input
        type="file"
        id="photos"
        name="photos"
        multiple
        onChange={handleFileChange}
      />
      <br />
      <h3>Your Details</h3>
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        onChange={handleChange}
      />
      <br />
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        onChange={handleChange}
      />
      <br />
      <button type="submit">Post</button>
    </form>
  );
};

export default ProductForm;
