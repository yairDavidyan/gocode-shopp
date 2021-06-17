import { createRef, useContext } from "react";
import CartContext from "./CartContext";
import { makeStyles } from "@material-ui/core";
import React from "react";
import Fade from "@material-ui/core/Fade";
import "./updateSale.css";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

function UpdateSale() {
  const {
    updateSale,
    setUpdateSale,
    setDate,
    setPercent,
    setSaleCategory,
    products,
    setSnackBar,
    setMessage,
    changeDisplay,
  } = useContext(CartContext);

  const categories = products
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);
  let textInputDate = createRef();
  let textInputPercent = createRef();

  function change(value) {
    if (value === "ALL") {
      setSaleCategory("all products");
    } else {
      setSaleCategory(value);
    }
    changeDisplay("all products");
  }

  function updateSaleFun() {
    setDate(textInputDate.current.value);
    setPercent(textInputPercent.current.value);
    setSnackBar(true);
    setMessage("Successfully update sale");
    handleClose();
  }
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      marginTop: "10%",
    },
  }));

  const classes = useStyles();

  const handleClose = () => {
    setUpdateSale(false);
  };
  return (
    <>
      <Fade in={updateSale}>
        <div className={classes.paper}>
          <label for="input">
            <i class="fa fa-ticket" aria-hidden="true">
              update sale
            </i>{" "}
          </label>
          <div className="collection-sort">
            <label className="lableApp">select category for sale</label>
            <select
              className="selectCategory"
              onChange={(e) => change(e.target.value)}
            >
              <option value=""></option>
              <option value="all products">All</option>
              {categories.map((categories) => (
                <option value={categories} key={categories}>
                  {categories}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>saving percent:</label>
            <input
              ref={textInputPercent}
              className="inputPayment"
              type="text"
              id="sale"
              name="sale"
              placeholder=""
            />
          </div>
          <div>
            <label>up to:</label>
            <input
              ref={textInputDate}
              className="inputPayment"
              type="datetime-local"
              id="sale"
              name="sale"
              placeholder=""
            />
          </div>
          <Button
            onClick={() => updateSaleFun()}
            style={{ left: "63px" }}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      </Fade>
    </>
  );
}
export default UpdateSale;
