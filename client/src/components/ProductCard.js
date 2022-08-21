import "./productCard.css";
import { useContext } from "react";
import CartContext from "./CartContext";
import { Link } from "react-router-dom";
import minusLogo from "../images/minusLogo.png";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
function ProductCard({
  title,
  price,
  image,
  description,
  product,
  amount,
  id,
}) {
  const { setItems, setProducts, isSale, percent, saleCategory } =
    useContext(CartContext);

  function addProduct(productCategory) {
    setProducts((prev) =>
      prev.map((item) =>
        item._id === product._id ? { ...item, amount: item.amount + 1 } : item
      )
    );

    setItems((prev) => {
      const isFound = prev.some((item) => item._id === product._id);
      // console.log(saleCategory);
      if (isFound) {
        return prev.map((item) =>
          item._id === product._id
            ? saleCategory === productCategory ||
              saleCategory === "all products"
              ? {
                  ...item,
                  amount: item.amount + 1,
                  price: +(price - (price / 100) * percent).toFixed(2),
                  isSaleProduct: true,
                }
              : { ...item, amount: item.amount + 1, isSaleProduct: false }
            : item
        );
      } else {
        if (
          saleCategory === productCategory ||
          saleCategory === "all products"
        ) {
          return [
            ...prev,
            {
              ...product,
              amount: 1,
              price: +(price - (price / 100) * percent).toFixed(2),
              isSaleProduct: true,
            },
          ];
        }
        return [...prev, { ...product, amount: 1, isSaleProduct: false }];
      }
    });
  }
  function deleteProduct() {
    setProducts((prev) => {
      return prev.map((item) =>
        item._id === product._id
          ? product.amount > 0
            ? { ...item, amount: item.amount - 1 }
            : item
          : item
      );
    });

    setItems((prev) => {
      const index = prev.findIndex((x) => x._id === product._id);
      if (product.amount > 0) {
        if (prev[index].amount === 1) {
          prev.splice(index, 1);
          return prev;
        } else {
          prev[index].amount -= 1;
          return prev;
        }
      } else {
        return prev;
      }
    });
  }
  return (
    <>
      <Fade bottom cascade>
        <div className="product-card">
          {isSale &&
            (saleCategory === product.category ||
              saleCategory === "all products") && (
              <>
                <div className=" fa fa-arrow-down fa-2x arrow bounce">
                  {percent}%{" "}
                </div>
              </>
            )}
          <Link to={`/product/${id}`}>
            <div className="productImage">
              <img src={image} alt={title} title={description} />
            </div>
          </Link>

          {/* S */}

          <div className="product-info">
            <h5>{title}</h5>
            <h6
              style={
                isSale &&
                (saleCategory === product.category ||
                  saleCategory === "all products")
                  ? {
                      textDecoration: "line-through",
                      textDecorationColor: "black",
                    }
                  : { textDecoration: "none" }
              }
            >
              {price}
            </h6>
            {isSale &&
              (saleCategory === product.category ||
                saleCategory === "all products") && (
                <h6>
                  {" "}
                  {isSale && (price - (price / 100) * percent).toFixed(2)}
                </h6>
              )}
            <div className="plusMinus" style={{ display: "flex" }}>
              <IconButton color="secondary" onClick={deleteProduct}>
                <RemoveIcon />
              </IconButton>
              <h3 style={{ marginTop: "16px" }}>{amount}</h3>

              <IconButton
                color="secondary"
                aria-label="add to shopping cart"
                onClick={() => addProduct(product.category)}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default ProductCard;
