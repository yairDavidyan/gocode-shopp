import { createRef, useContext } from "react";
import CartContext from "./CartContext";
import { makeStyles } from "@material-ui/core";
import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
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
    saleCategory,
    setSaleCategory,
    products,
  } = useContext(CartContext);

  const categories = products
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);
  let textInputDate = createRef();
  let textInputPercent = createRef();

  function changeDisplay(value) {
    if (value === "") {
      setSaleCategory("all product");
    }
    setSaleCategory(value);
  }

  function updateSaleFun() {
    setDate(textInputDate.current.value);
    setPercent(textInputPercent.current.value);
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

  const handleOpen = () => {
    setUpdateSale(true);
  };

  const handleClose = () => {
    setUpdateSale(false);
  };
  return (
    <>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={updateSale}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      > */}
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
      {/* </Modal> */}
    </>
  );

  // <Modal isOpen={true} onRequestClose={updateSale}>
  {
    /* <div>
        <label for="input">
          <i class="fa fa-envelope"></i> sale
        </label>
        <input
          className="inputPayment"
          type="text"
          id="sale"
          name="sale"
          placeholder="%%"
        />
      </div>
    </Modal> */
  }
}
export default UpdateSale;
