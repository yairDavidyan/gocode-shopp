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
});

const Product = model("Product", ProductSchema);
const Customer = model("Customer", CustomerSchema);
const Order = model("Order", OrderSchema);

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
  Product.findById(id)
    .then((product) => res.send(product))
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});

//add new product
app.post("/api/product", (req, res) => {
  Product.insertMany([
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
    },
  ]).then((addProduct) => {
    res.send(addProduct);
  });
});

//filter by title search
app.get("/api/product", (req, res) => {
  const { title, category } = req.query;
  console.log(req.query);
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

function readCustomer(callback) {
  Customer.find({})
    .exec()
    .then((CustomerArr) => callback(CustomerArr));
}

app.post("/customer", (req, res) => {
  Customer.insertMany([
    {
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      mail: req.body.mail,
      adress: req.body.adress,
    },
  ]).then((customer) => {
    res.send(customer);
  });
});
app.get("/customer", (req, res) => {
  readCustomer((customer) => {
    const { q } = req.query;
    if (q) {
      let updateArr = customer.filter(
        (item) => item.phone.includes(q) || item.mail.includes(q)
      );
      res.send(updateArr.length ? updateArr : "no data");
    } else {
      res.send(customer);
    }
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
app.get("/order", (req, res) => {
  readOrder((order) => {
    const { q } = req.query;
    if (q) {
      let updateArr = order.filter(
        (item) => item.phone.includes(q) || item.mail.includes(q)
      );
      res.send(updateArr.length ? updateArr : "no data");
    } else {
      res.send(order);
    }
  });
});

app.post("/order", (req, res) => {
  Order.insertMany([
    {
      numberOrder: "123456",
      date: "2012-04-23T18:25:43.511Z",
      cost: 750,
      ifPay: true,
      customer: Customer._id,
      // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
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
    app.listen(8080);
  });
