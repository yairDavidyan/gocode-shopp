import "./productCard.css";
import { useContext, useState } from "react";
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
  const { setItems, setProducts, isSale, percent } = useContext(CartContext);
  function ifSale() {
    let salePrice;
    salePrice = (price - (price / 100) * percent).toFixed(2);
    if (isSale) {
      return salePrice;
    } else {
      return;
    }
  }

  function addCart() {
    setProducts((prev) => {
      return prev.map((item) =>
        item.id === product.id ? { ...item, amount: item.amount + 1 } : item
      );
    });
    setItems((prev) => {
      const isFound = prev.find((item) => item.id === product.id);
      if (isFound) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...product, amount: 1 }];
    });
  }
  function deleteCart() {
    setProducts((prev) => {
      return prev.map((item) =>
        item.id === product.id
          ? product.amount > 0
            ? { ...item, amount: item.amount - 1 }
            : item
          : item
      );
    });

    setItems((prev) => {
      let index;
      const find = prev.find((item) => item.id === product.id);
      console.log(find);
      if (find) {
        index = prev.findIndex((x) => x.id === find.id);
        console.log(index);
      }
      if (product.amount > 0) {
        if (find.amount === 1) {
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
          <Link to={`products/${id}`}>
            <div className="productImage">
              <img src={image} alt={title} title={description} />
            </div>
          </Link>
          <div className="product-info">
            <h5>{title}</h5>
            <h6
              style={
                isSale
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
            >
              {price}
            </h6>
            {isSale && <h6> {ifSale()} </h6>}
            <div className="plusMinus" style={{ display: "flex" }}>
              <button className="plus-button" onClick={deleteCart}>
                <img style={{ height: "70%" }} src={minusLogo}></img>
              </button>
              <h3 style={{ marginTop: "23px" }}>{amount}</h3>
              <button className="plus-button" onClick={addCart}>
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
