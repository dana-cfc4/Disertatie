const mongoose = require("mongoose");
const PORT = 8080;

const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const subsubcategoryRoutes = require("./routes/subsubcategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const brandRoutes = require("./routes/brandRoutes");
const specificationRoutes = require("./routes/specificationRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const shoppingCartRoutes = require("./routes/shoppingCartRoutes");
const orderRoutes = require("./routes/orderRoutes");

require("./models/user");
require("./models/category");
require("./models/subcategory");
require("./models/subsubcategory");
require("./models/product");
require("./models/rating");
require("./models/brand");
require("./models/specification");
require("./models/favorite");
require("./models/shoppingCart");
require("./models/order");

const app = express();

const dbURI = 'mongodb+srv://atomica:atomicaPass@cluster0.s3atl.mongodb.net/MakeupShop?retryWrites=true&w=majority'

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (result) {
    console.log("Database is connected");
  })
  .catch((err) => console.log(err));

require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/subsubcategories", subsubcategoryRoutes);
app.use("/products", productRoutes);
app.use("/ratings", ratingRoutes);
app.use("/brands", brandRoutes);
app.use("/specifications", specificationRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/shoppingCart", shoppingCartRoutes);
app.use("/orders", orderRoutes);

const STRIPE_SECRET_KEY_TEST =
  "sk_test_51IcwaYEbug5QSXQNJfb2IoC4AgdnIXv1WgmSkg1TUdVdubvhh54cTuTjO607rUxKV6Ddxw5iqPzjucv0GLu6PuUH00Qhwqk6xM";
const stripe = require("stripe")(STRIPE_SECRET_KEY_TEST);

app.post("/api/stripe/charge", async (req, resp) => {
  const { token, currency, price } = req.body;
  const charge = await stripe.charges.create({
    amount: price,
    currency,
    source: token,
  });

  if (!charge) throw new Error("charge unsuccessful");
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
);

module.exports = app;