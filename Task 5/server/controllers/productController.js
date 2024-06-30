const products = [];

const createProduct = (req, res) => {
  const {
    title,
    description,
    price,
    buyingDate,
    buyingPrice,
    phoneNumber,
    location,
  } = req.body;
  const photos = req.files.map((file) => file.filename);

  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    buyingDate,
    buyingPrice,
    phoneNumber,
    location,
    photos,
  };

  products.push(newProduct);
  res
    .status(201)
    .send({ message: "Product created successfully!", product: newProduct });
};

const getProducts = (req, res) => {
  res.json(products);
};

module.exports = {
  createProduct,
  getProducts,
};
