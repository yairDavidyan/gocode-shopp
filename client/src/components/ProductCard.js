import "./productCard.css";
import { useContext } from "react";
import CartContext from "./CartContext";
import { Link } from "react-router-dom";
import addLogo from "../images/addLogo.png";
import minusLogo from "../images/minusLogo.png";
import Fade from "react-reveal/Fade";

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

  function addProduct() {
    setProducts((prev) => {
      return prev.map((item) =>
        item._id === product._id ? { ...item, amount: item.amount + 1 } : item
      );
    });
    setItems((prev) => {
      const isFound = prev.some((item) => item._id === product._id);
      if (isFound) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...product, amount: 1 }];
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
            (saleCategory === product.category || saleCategory === "") && (
              <>
                <div className=" fa fa-arrow-down fa-2x arrow bounce">
                  {percent}%{" "}
                </div>
              </>
            )}
          <Link to={`/api/product/${id}`}>
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
                (saleCategory === product.category || saleCategory === "")
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
              (saleCategory === product.category || saleCategory === "") && (
                <h6>
                  {" "}
                  {isSale && (price - (price / 100) * percent).toFixed(2)}
                </h6>
              )}
            <div className="plusMinus" style={{ display: "flex" }}>
              <button className="plus-button" onClick={deleteProduct}>
                <img style={{ height: "70%" }} src={minusLogo}></img>
              </button>
              <h3 style={{ marginTop: "23px" }}>{amount}</h3>
              <button className="plus-button" onClick={addProduct}>
                <img style={{ height: "70%" }} src={addLogo}></img>
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default ProductCard;
