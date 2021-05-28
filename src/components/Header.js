import "./header.css";
import Slider from "@material-ui/core/Slider";
import { useContext, useState } from "react";
import CartContext from "./CartContext";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, IconButton, withStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import bali from "../images/bali.png";
import Search from "./Search";

function Header({ categories, changeDisplay }) {
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
  const [loginBool, setLoginBool] = useState(false);

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
  });
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
    root: {
      marginRight: "80px",
    },
  }))(Badge);
  const classes = useStyles();

  return (
    <>
      <div className="container">
        <div className="box box1">
          {" "}
          <span className="HeaderH1">
            <img src={bali} alt={"logo"}></img>
          </span>
        </div>
        <div className="box box4">
          {" "}
          <div>
            <span className="filter-total">
              <h2>{totalFilter} / </h2>
              <h2>{totalProducts}</h2>
            </span>
            <Slider
              className={classes.root}
              value={value}
              max={1000}
              onChange={handleChange}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
            />
          </div>
        </div>
        <div className="box box5">
          {" "}
          <nav className="ProductFilter">
            <div className="sort">
              <div className="collection-sort">
                <label className="lableApp">Filter by:</label>
                <select
                  className="selectCategory"
                  onChange={(e) => changeDisplay(e.target.value)}
                >
                  <option value="all products">All</option>
                  {categories.map((categories) => (
                    <option value={categories} key={categories}>
                      {categories}
                    </option>
                  ))}
                </select>
              </div>

              <div className="collection-sort">
                <label className="lableApp">Sort by:</label>
                <select>
                  <option value="/">Featured</option>
                  <option value="/">Best Selling</option>
                  <option value="/">Alphabetically, A-Z</option>
                  <option value="/">Alphabetically, Z-A</option>
                  <option value="/">Price, low to high</option>
                  <option value="/">Price, high to low</option>
                  <option value="/">Date, new to old</option>
                  <option value="/">Date, old to new</option>
                </select>
              </div>
            </div>
          </nav>
        </div>
        <div className="box box2">
          <Search />
        </div>
        <div className="box box3">
          {" "}
          <IconButton onClick={() => setIsCart(!isCart)} aria-label="cart">
            <StyledBadge
              style={{ left: "45px", bottom: "auto", top: "35px" }}
              badgeContent={
                items && items.reduce((total, curr) => total + curr.amount, 0)
              }
              color="secondary"
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Header;
