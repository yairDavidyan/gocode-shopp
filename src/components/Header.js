import "./header.css";
import Slider from "@material-ui/core/Slider";
import { useContext, useState } from "react";
import CartContext from "./CartContext";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, IconButton, withStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import bali from "../images/bali.png";
import Search from "./Search";

function Header() {
  let {
    totalFilter,
    setTotalFilter,
    products,
    totalProducts,
    setValue,
    value,
    items,
    setIsCart,
    isCart,
  } = useContext(CartContext);

  const handleChange = (even, newValue) => {
    setValue(() => newValue);
    // update filter number product
    let select = document.querySelector(".selectCategory").value;
    totalFilter = products.filter(
      (el) =>
        (el.category === select || select === "all products") &&
        el.price >= newValue[0] &&
        el.price <= newValue[1]
    );
    setTotalFilter(totalFilter.length);
  };

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
  });
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);
  const classes = useStyles();

  return (
    <>
      <div className="container">
        <div className="box box1">
          {" "}
          <span className="HeaderH1">
            <img style={{ marginTop: "30px" }} src={bali} alt={"logo"}></img>
          </span>
        </div>
        <div className="box box2">
          <Search />
        </div>
        <div className="box box3">
          {" "}
          {/* <IconButton
            onClick={() => setIsCart(!isCart)}
            aria-label="cart"
            className={classes.a}
          >
            <StyledBadge
              badgeContent={
                items && items.reduce((total, curr) => total + curr.amount, 0)
              }
              color="secondary"
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton> */}
        </div>
      </div>
    </>
  );
}

export default Header;
