import "./App.css";
import Header from "./components/Header.js";
import Products from "./components/Products.js";
import { useState, useEffect } from "react";
import CartContext from "./components/CartContext";
import Cart from "./components/Cart";
import Load from "./components/Load";
import { Route, Switch } from "react-router";
import Information from "./views/Information";
import Timer from "./components/Timer";
import Search from "./components/Search";
import Login from "./components/Login";

function App() {
  const [choice, setChoice] = useState("all products");
  const [products, setProducts] = useState([]);
  let [productsFilter, setProductsFilter] = useState([]);
  const [isShown, setShown] = useState(true);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState([]);
  let [totalProducts, setTotalProducts] = useState([]);
  let [totalFilter, setTotalFilter] = useState([]);
  const [isCart, setIsCart] = useState(false);

  const categories = products
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then(
        (data) => (
          setProducts(data),
          setTotalFilter(data.length),
          setTotalProducts(data.length),
          setProductsFilter(data),
          setValue([
            data.reduce(
              (min, p) => (p.price < min ? p.price : min),
              data[0].price
            ),
            data.reduce(
              (max, p) => (p.price > max ? p.price : max),
              data[0].price
            ),
          ])
        )
      )
      .then((data) =>
        setProducts((data) => {
          return data.map((el) => (el.id ? { ...el, amount: 0 } : el));
        })
      )
      .then(setShown(false));
  }, []);

  function changeDisplay(category) {
    setChoice(category);

    //get products by category
    productsFilter = products.filter(
      (el) => el.category === category || category === "all products"
    );
    // set min-max value in slider by select category
    setValue(() => [
      productsFilter.reduce(
        (min, p) => (p.price < min ? p.price : min),
        productsFilter[0].price
      ),
      productsFilter.reduce(
        (max, p) => (p.price > max ? p.price : max),
        productsFilter[0].price
      ),
    ]);
    // number product from all product category
    setTotalProducts(productsFilter.length);
    setTotalFilter(productsFilter.length);
  }

  return (
    <CartContext.Provider
      value={{
        isCart,
        setIsCart,
        totalFilter,
        setTotalFilter,
        setTotalProducts,
        totalProducts,
        productsFilter,
        products,
        items,
        setProducts,
        setItems,
        setValue,
        value,
      }}
    >
      <Switch>
        <Route path="/" exact>
          <div>
            <Login />
            <Header categories={categories} changeDisplay={changeDisplay} />
            <Timer />
            <div className="divContainer">
              <Cart />
              {isShown ? (
                <Load />
              ) : (
                <Products
                  products={products.filter(
                    (el) =>
                      (el.category === choice || choice === "all products") &&
                      el.price >= value[0] &&
                      el.price <= value[1]
                  )}
                />
              )}
            </div>
          </div>
        </Route>
        <Route path="/products/:id">
          <Information />
        </Route>
      </Switch>
    </CartContext.Provider>
  );
}
export default App;
