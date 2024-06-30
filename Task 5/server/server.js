const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/products", upload.array("photos"), productRoutes);

app.post("/products", upload.array("photos"), (req, res) => {
  const {
    title,
    description,
    price,
    buyingDate,
    buyingPrice,
    phoneNumber,
    location,
  } = req.body;
  const photos = req.files;

  console.log(req.body);
  console.log(req.files);

  res.status(201).send({ message: "Product created successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
