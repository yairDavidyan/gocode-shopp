import { Badge, makeStyles, Slider, withStyles } from "@material-ui/core";
import { useContext } from "react";
import CartContext from "./CartContext";
import "./sliderFilter.css";

function SliderFilter({ categories, changeDisplay }) {
  let {
    totalFilter,
    setTotalFilter,
    products,
    totalProducts,
    setValue,
    value,
  } = useContext(CartContext);

  const selected = "selected";

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
      color: "#f50057",
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
    <div>
      <div className="boxSlider ">
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
      <div className="boxSlider2 ">
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
    </div>
  );
}
export default SliderFilter;
