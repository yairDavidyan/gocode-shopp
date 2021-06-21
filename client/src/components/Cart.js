import { useContext, useState } from "react";
import CartContext from "./CartContext";
import "./Cart.css";
import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Fade from "react-reveal/Fade";
import Payment from "./Payment";
import Backdrop from "@material-ui/core/Backdrop";
import Invoicing from "./Invoicing";
import AlertError from "./AlertError";
import suc from "../images/suc.png"; // Import using relative path

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "50px",
  },
  taxtFilde: {
    border: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "2px solid #000",
    padding: "16px 32px 24px",

    // background-image: url(/static/media/suc.a4016fa8.png);

    // backgroundSize: "48px",
    // backgroundImage: `url(${suc})`,
    // backgroundPosition: "center",
    // backgroundrepeat: "no-repeat",
    // backgroundPosition: "top",
    // float: "left",
    // backgroundRepeat: "no-repeat",
    backgroundColor: "#f7d12e",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "15px",
  },
}));

function Cart() {
  const {
    setItems,
    setProducts,
    items,
    isCart,
    percent,
    modal,
    setModal,
    userContentId,
    userContent,
    textError,
    setTextError,
  } = useContext(CartContext);
  let total = 0;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [numOrder, setNumOrder] = useState("");
  const [errorContent, setErrorContent] = useState(false);

  const handleOpen = () => {
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const classes = useStyles();
  let result;
  function amountChange(val, e) {
    setItems((prev) => {
      const index = prev.findIndex((x) => x._id === val._id);
      // if remove product in items
      if (prev[index].amount === 1 && prev[index].amount > e.target.value) {
        prev.splice(index, 1);
        return prev;
        /// if up amount
      } else if (prev[index].amount < e.target.value) {
        prev[index].amount += 1;
        return prev;
      } // down amount
      else {
        prev[index].amount -= 1;
        return prev;
      }
    });

    setProducts((prev) => {
      return prev.map((el) =>
        el._id === val._id ? { ...el, amount: +e.target.value } : el
      );
    });
  }
  function deleteCart(el) {
    setItems((prev) => {
      const index = prev.findIndex((item) => item._id === el._id);
      prev.splice(index, 1);
      return prev;
    });
    setProducts((prev) => {
      return prev.map((item) =>
        item._id === el._id ? { ...item, amount: 0 } : item
      );
    });
  }

  function totalSavings() {
    items.map((el) => {
      if (el.isSaleProduct) {
        total += ((el.price / (100 - percent)) * 100 - el.price) * el.amount;
      }
    });
    return total.toFixed(2);
  }

  function paymentClick() {
    if (userContent === "Hello Guest") {
      setTextError("You are not logged in - Please ");
      setErrorContent(true);
    } else if (items.length >= 1) {
      result = Math.random();
      result *= 1000000;
      result = Math.round(result);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      setNumOrder(result);

      today = yyyy + "-" + dd + "-" + mm;

      const addOrder = {
        numberOrder: result,
        //2012-04-23T18:25:43.511Z
        date: today,
        cost: items.reduce(
          (total, curr) => total + curr.price * curr.amount,
          0
        ),
        ifPay: true,
        customer: userContentId,
      };

      fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addOrder),
      })
        .then(
          fetch(`/api/order/${userContentId}`)
            .then((res) => res.json())
            .then((data) =>
              fetch(`/api/customer/${userContentId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({
                  orders: data && data.map((el) => el._id),
                }),
              })
            )
        )
        .then(
          fetch("/api/customer")
            .then((res) => res.json())
            .then((data) => console.log("data: ", data))
        );
      setOpenConfirm(true);
    } else {
      setTextError("There are no products in the cart, please add items");
      setErrorContent(true);
    }
  }

  return (
    <>
      {isCart && (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openConfirm}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openConfirm}>
              <div className={classes.paper}>
                <h2 className="order-confirm-title" id="transition-modal-title">
                  order Confirmation
                </h2>
                <p
                  className="order-confirm-description"
                  id="transition-modal-description"
                >
                  Order N.<strong className="num-order">{numOrder}</strong>{" "}
                  <br /> done successfully
                </p>
                {
                  <Invoicing
                    numOrder={numOrder}
                    setOpenConfirm={setOpenConfirm}
                  />
                }
              </div>
            </Fade>
          </Modal>
          <Fade bottom cascade>
            <div className="shopping-cart">
              <div className="titleCart">
                <label className="labal1">Image</label>
                <label className="labal1">Product</label>
                <label className="labal1">Price</label>
                <label className="labal1">Quantity</label>
                <label className="labal1">Total</label>
              </div>
              <Fade right cascade>
                <div className="cardShop">
                  {errorContent && (
                    <AlertError setErrorContent={setErrorContent} />
                  )}

                  {items.length !== 0 ? (
                    items.map((el) => (
                      <div className="product">
                        <div className="product-image">
                          <img alt={el.title} src={el.image} />
                        </div>
                        <div className="product-details">
                          <div className="product-title">{el.title}</div>
                        </div>
                        <div className="product-price">{el.price}</div>
                        <div className="product-quantity">
                          <TextField
                            className={classes.root}
                            onChange={(e) => amountChange(el, e)}
                            type="number"
                            value={el.amount}
                            min="0"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                          />
                          <div className="product-removal">
                            <Button
                              onClick={() => deleteCart(el)}
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              startIcon={<DeleteIcon />}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>

                        <div className="product-line-price">
                          {(el.price * el.amount).toFixed(0)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div class="container-fluid mt-100">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="card">
                            <div class="card-body cart">
                              <div class="col-sm-12 empty-cart-cls text-center">
                                <img
                                  src="https://i.imgur.com/dCdflKN.png"
                                  alt=""
                                  width="130"
                                  height="130"
                                  class="img-fluid mb-4 mr-3"
                                />
                                <h3>
                                  <strong>Your Cart is Empty</strong>
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="containerTotal">
                  <div className="totals">
                    <div className="totals-item">
                      <label>Quantity</label>
                      <div
                        style={{ float: "right" }}
                        className=""
                        id="cart-subtotal"
                      >
                        {items.reduce((total, curr) => total + curr.amount, 0)}
                      </div>
                    </div>
                    {/* <div class="totals-item">
              <label>Tax (5%)</label>
              <div class="totals-value" id="cart-tax">3.60</div>
            </div> */}
                    {/* <div class="totals-item">
              <label>Shipping</label>
              <div class="totals-value" id="cart-shipping">15.00</div>
            </div> */}
                    <div className="totals-item">
                      <label>Savings</label>
                      <div style={{ float: "right" }}>${totalSavings()}</div>
                    </div>
                    <div className="totals-item totals-item-total">
                      <label>Grand Total</label>
                      <div className="totals-value" id="cart-total">
                        {items
                          .reduce(
                            (total, curr) => total + curr.price * curr.amount,
                            0
                          )
                          .toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ borderBottom: "3px solid #eee", display: "grid" }}
                  >
                    <button
                      onClick={paymentClick}
                      style={{ marginBottom: "15px" }}
                      className="checkout"
                    >
                      payment
                    </button>
                    <button
                      onClick={() => setModal(true)}
                      style={{ marginBottom: "15px" }}
                      className="checkout"
                    >
                      add new cart
                    </button>
                  </div>

                  {modal && <Payment />}
                </div>
              </Fade>
            </div>
          </Fade>
        </>
      )}
    </>
  );
}
export default Cart;
