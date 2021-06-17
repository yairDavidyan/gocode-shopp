var $ = require("jquery");
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
require("dotenv").config();

app.use(express.static("client/build"));

const CustomerSchema = Schema({
  name: String,
  lastName: String,
  phone: String,
  mail: String,
  adress: String,
  password: String,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const OrderSchema = Schema({
  numberOrder: String,
  date: Date,
  cost: Number,
  ifPay: Boolean,
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const ProductSchema = Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  amount: Number,
});

const AdminSchema = Schema({
  name: String,
  password: String,
});

const Product = model("Product", ProductSchema);
const Customer = model("Customer", CustomerSchema);
const Order = model("Order", OrderSchema);
const Admin = model("Admin", AdminSchema);

//*************************************************************** * /
//admin

app.get("/api/admin", (req, res) => {
  const { name, password } = req.query;
  if (
    process.env.DB_USERNAME === name &&
    process.env.DB_PASSWORD === password
  ) {
    res.send("sucsses admin");
  } else {
    res.send("not admin");
  }
});
app.post("/api/admin", (req, res) => {
  Admin.insertMany([
    {
      name: req.body.name,
      password: req.body.password,
    },
  ]).then((admin) => res.send(admin));
});

//*************************************************************** */

app.get("/api/productMinMax", (req, res) => {
  const { min, max } = req.query;
  if (min && max) {
    Product.find({ price: { $gte: +min } } && { price: { $lte: +max } }).then(
      (product) => res.send(product)
    );
  } else {
    Product.find({}).then((product) => res.send(product));
  }
});
//filter by id
app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  Product.findById(id)
    .then((product) => res.send(product))
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});

//add new product
app.post("/api/product", (req, res) => {
  console.log(req.body);
  Product.insertMany([
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      amount: req.body.amount,
    },
  ]).then((addProduct) => {
    res.send(addProduct);
  });
});

//filter by title search
app.get("/api/product", (req, res) => {
  const { title, category } = req.query;
  if (title || category) {
    Product.find(
      { title: { $regex: `.*${title}.*` } } || {
        category: { $regex: `.*${category}.*` },
      }
    ).then((product) => res.send(product));
  } else {
    Product.find({}).then((product) => res.send(product));
  }
});

//update product
app.put("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, category, description, image } = req.body;
  const updateArr = {
    ...(!!title && { title }),
    ...(!!price && { price }),
    ...(!!category && { category }),
    ...(!!description && { description }),
    ...(!!image && { image }),
  };

  Product.findByIdAndUpdate(id, updateArr, { new: true })
    .then((product) => res.send(product))
    .catch((err) => {
      res.status(500);
      res.send(err.massage);
    });
});

//dalete product
app.delete("/api/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id).then(res.send("delete"));
});

//***************************************************************** */

//db custumer

app.post("/api/customer", (req, res) => {
  Customer.insertMany([
    {
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      mail: req.body.mail,
      adress: req.body.adress,
      password: req.body.password,
      orders: req.body.orders,
    },
  ]).then((customer) => {
    res.send(customer);
  });
});

app.get("/api/customer", (req, res) => {
  Customer.find({})
    .populate("orders")
    .then((customer) => res.send(customer));
});

//dalete customer
app.delete("/api/customer/:id", (req, res) => {
  const { id } = req.params;
  Customer.findByIdAndDelete(id).then(res.send("delete"));
});
//update customer
app.put("/api/customer/:id", (req, res) => {
  const { id } = req.params;
  const { name, lastName, phone, mail, adress, password, orders } = req.body;
  const updateArr = {
    ...(!!name && { name }),
    ...(!!lastName && { lastName }),
    ...(!!phone && { phone }),
    ...(!!mail && { mail }),
    ...(!!adress && { adress }),
    ...(!!password && { password }),
    ...(!!orders && { orders }),
  };

  Customer.findByIdAndUpdate(id, updateArr, { new: true })
    .then((customer) => res.send(customer))
    .catch((err) => {
      res.status(500);
      res.send(err.massage);
    });
});
//***************************************************************** */

//db order

function readOrder(callback) {
  Order.find({})
    .exec()
    .then((OrderArr) => callback(OrderArr));
}

//filter by title search
app.get("/api/order", (req, res) => {
  Order.find({}).then((order) => res.send(order));
});

app.post("/api/order", (req, res) => {
  Order.insertMany([
    {
      numberOrder: req.body.numberOrder,
      //2012-04-23T18:25:43.511Z
      date: req.body.date,
      cost: req.body.cost,
      ifPay: req.body.ifPay,
      // customer: req.body.customer,
      // products: req.body.product,
    },
  ]).then((order) => {
    res.send(order);
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("connect");
    app.listen(process.env.PORT || 5000);
  });
