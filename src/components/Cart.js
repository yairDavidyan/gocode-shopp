import { useContext } from "react";
import CartContext from "./CartContext";
import "./Cart.css";
import { Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Fade from "react-reveal/Fade";

function Cart() {
  const { setItems, setProducts, items, isCart, percent } =
    useContext(CartContext);
  let index;
  const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: "50px",
    },
  }));

  const classes = useStyles();
  function amountChange(val, e) {
    setItems((prev) => {
      //find object in items In order to update amount
      const find = prev.find((item) => item.id === val.id);
      if (find) {
        //index the object in item
        index = prev.findIndex((x) => x.id === find.id);
      }
      // if remove product in items
      if (find.amount === 1 && find.amount > e.target.value) {
        prev.splice(index, 1);
        return prev;
        /// if up amount
      } else if (find.amount < e.target.value) {
        prev[index].amount += 1;
        console.log(prev);
        return prev;
      } // down amount
      else {
        prev[index].amount -= 1;
        return prev;
      }
    });

    setProducts((prev) => {
      return prev.map((el) =>
        el.id === val.id ? { ...el, amount: +e.target.value } : el
      );
    });
  }
  function deleteCart(el) {
    setItems((prev) => {
      const find = prev.find((item) => item.id === el.id);
      console.log("find: ", find);
      if (find) {
        //index the object in item
        index = prev.findIndex((x) => x.id === find.id);
        console.log("index: ", index);
      }
      prev.splice(index, 1);
      console.log("prev: ", prev);

      return prev;
    });
    setProducts((prev) => {
      return prev.map((item) =>
        item.id === el.id ? { ...item, amount: 0 } : item
      );
    });
  }

  return (
    <>
      {isCart && (
        <Fade bottom cascade>
          <div
            style={{ marginRight: "10px", marginLeft: "10px" }}
            className="shopping-cart"
          >
            <div className="titleCart">
              <label className="labal1">Image</label>
              <label className="labal1">Product</label>
              <label className="labal1">Price</label>
              <label className="labal1">Quantity</label>
              <label className="labal1">Total</label>
            </div>
            <Fade right cascade>
              <div className="cardShop">
                {items.map((el) => (
                  <div className="product">
                    <div className="product-image">
                      <img alt={el.title} src={el.image} />
                    </div>
                    <div className="product-details">
                      <div className="product-title">{el.title}</div>
                    </div>
                    <div className="product-price">
                      {(el.price - (el.price / 100) * percent).toFixed(2)}
                    </div>
                    <div className="product-quantity">
                      <input
                        onChange={(e) => amountChange(el, e)}
                        type="number"
                        value={el.amount}
                        min="0"
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
                      {(el.price - (el.price / 100) * percent).toFixed(2) *
                        el.amount}
                    </div>
                  </div>
                ))}
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
                    <div style={{ float: "right" }}>
                      {(
                        items.reduce(
                          (total, curr) => total + curr.price * curr.amount,
                          0
                        ) -
                        items.reduce(
                          (total, curr) =>
                            total +
                            (curr.price - (curr.price / 100) * percent) *
                              curr.amount,
                          0
                        )
                      ).toFixed(2)}
                    </div>
                  </div>
                  <div className="totals-item totals-item-total">
                    <label>Grand Total</label>
                    <div className="totals-value" id="cart-total">
                      {items
                        .reduce(
                          (total, curr) =>
                            total +
                            (curr.price - (curr.price / 100) * percent) *
                              curr.amount,
                          0
                        )
                        .toFixed(2)}
                    </div>
                  </div>
                </div>
                <div style={{ borderBottom: "3px solid #eee" }}>
                  <button style={{ marginBottom: "15px" }} className="checkout">
                    payment
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        </Fade>
      )}
    </>
  );
}
export default Cart;
