import "./home.css";
import Header from "./Header.js";
import Products from "./Products.js";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import Load from "./Load";
import Timer from "./Timer";
import Login from "./Login";
import CartContext from "./CartContext";
import SliderImage from "./SliderImage";
import homeImage from "../images/homeImage.jpg";
import SliderFilter from "./SliderFilter";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge, IconButton, makeStyles, withStyles } from "@material-ui/core";
import UpdateProduct from "./UpdateProduct";
import UpdateSale from "./UpdateSale";
import Snackbars from "./Snackbars";

function Home() {
  const [choice, setChoice] = useState("all products");
  const [products, setProducts] = useState([]);
  let [productsFilter, setProductsFilter] = useState([]);
  let [minMax, setMinMax] = useState([]);
  const [isShown, setShown] = useState(true);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState([]);
  let [totalProducts, setTotalProducts] = useState([]);
  let [totalFilter, setTotalFilter] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [percent, setPercent] = useState(0);
  const [modal, setModal] = useState(false);
  const [updateSale, setUpdateSale] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [date, setDate] = useState("");
  const [isConect, setIsConect] = useState(true);
  const [saleCategory, setSaleCategory] = useState("");
  const [ifManager, setIfManager] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [openUser, setOpenUser] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userContent, setUserContent] = useState("Hello Guest");
  const [userContentId, setUserContentId] = useState("");
  const [textError, setTextError] = useState("");

  const calMin = (data) => {
    return data.reduce(
      (min, p) => (p.price < min ? p.price : min),
      data[0].price
    );
  };
  const calMax = (data) => {
    return data.reduce(
      (max, p) => (p.price > max ? p.price : max),
      data[0].price
    );
  };

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 38,
      top: -28,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      width: "4em",
      height: "4em",
      transform: "rotate(-0.1turn)",
    },
  }))(Badge);
  const useStyles = makeStyles({
    root: {
      width: "500px;",
      color: "#f50057",
      padding: "6px",
    },
    a: {
      marginRight: "20px",
      marginTop: "10px",
      padding: "0px",
    },
    iconShoping: {
      height: "4em",
      width: "4em",
      display: "block",
      zIndex: "5",
      animation: "updown 1s ease infinite",
    },
  });

  const classes = useStyles();
  const categories = products
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  useEffect(() => {
    fetch("api/product")
      .then((response) => response.json())
      .then(
        (data) => (
          setProducts(data),
          setTotalFilter(data.length),
          setTotalProducts(data.length),
          setProductsFilter(data),
          setMinMax(data),
          setValue([calMin(data), calMax(data)])
        )
      )
      .then(setShown(false));
  }, []);

  console.log("pro:", products);
  console.log("iems:", items);
  function changeDisplay(category) {
    setChoice(category);
    //get products by category
    productsFilter = products.filter(
      (el) => el.category === category || category === "all products"
    );
    setMinMax(productsFilter);
    // set min-max value in slider by select category
    setValue([calMin(productsFilter), calMax(productsFilter)]);
    // number product from all product category
    setTotalProducts(productsFilter.length);
    setTotalFilter(productsFilter.length);
  }
  return (
    <CartContext.Provider
      value={{
        textError,
        setTextError,
        userContentId,
        setUserContentId,
        userContent,
        setUserContent,
        choice,
        setMinMax,
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
        setIsSale,
        isSale,
        percent,
        setPercent,
        modal,
        setModal,
        updateSale,
        setUpdateSale,
        date,
        setDate,
        changeDisplay,
        saleCategory,
        setSaleCategory,
        ifManager,
        setIfManager,
        updateProduct,
        setUpdateProduct,
        snackBar,
        setSnackBar,
        message,
        setMessage,
        minMax,
        calMax,
        calMin,
        openUser,
        setOpenUser,
        isSignUp,
        setIsSignUp,
        categories,
        setProductsFilter,
      }}
    >
      <div className="containerHome">
        {isConect ? (
          <>
            <Login />

            {ifManager ? (
              <div className="container-managment">
                <div className="table-update">
                  {updateProduct && <UpdateProduct />}
                  {updateSale && <UpdateSale />}
                  {snackBar && <Snackbars />}
                </div>
              </div>
            ) : (
              <>
                <Header />

                <SliderImage />
                <Timer />

                {isShown ? (
                  <Load />
                ) : (
                  <>
                    <SliderFilter
                      categories={categories}
                      changeDisplay={changeDisplay}
                    />
                    <div className="divContainer">
                      <Cart />
                      <div className="content">
                        <Products
                          products={products.filter(
                            (el) =>
                              (el.category === choice ||
                                choice === "all products") &&
                              el.price >= value[0] &&
                              el.price <= value[1]
                          )}
                        />
                        <div class="side">
                          <IconButton
                            onClick={() => setIsCart(!isCart)}
                            aria-label="cart"
                            className={classes.a}
                          >
                            <StyledBadge
                              badgeContent={
                                items &&
                                items.reduce(
                                  (total, curr) => total + curr.amount,
                                  0
                                )
                              }
                              color="secondary"
                            >
                              <ShoppingCartIcon
                                fa-rotate-90
                                className={classes.iconShoping}
                              />
                            </StyledBadge>
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <div
            style={{
              height: "600px",
              width: "1334px",
              backgroundImage: `url(${homeImage})`,
            }}
          >
            <div id="move">
              <div id="cercle">
                <p>welcome</p>
              </div>
              <div id="Bienvenue">
                <h1>shopping online</h1>
                <h3>
                  <a
                    className="enter"
                    onClick={() => setIsConect(true)}
                    href="#.html"
                  >
                    ENTRER
                  </a>
                </h3>
              </div>
            </div>
            {/* <h1>welcom to Bali Express</h1>
            <h3>shopping online</h3> */}
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}
export default Home;
