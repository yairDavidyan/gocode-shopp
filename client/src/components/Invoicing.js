import { Button, Modal } from "@material-ui/core";
import "./invoice.css";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CartContext from "./CartContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    overflowY: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    position: "relative",
    left: "27%",
    top: "14px",
  },
}));

function Invoicing({ numOrder }) {
  const { userContentId, items } = useContext(CartContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
    console.log(userContentId);
    fetch(`/api/customer/${userContentId}`)
      .then((res) => res.json())
      .then((data) => setUserDetails(data));
  };
  console.log(userDetails);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        type="button"
        onClick={handleOpen}
      >
        invoice
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div class="container3">
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "75px" }}>
                    <div class="logotype">Bali Express</div>
                  </td>
                  <td style={{ width: "300px" }}>
                    <div
                      style={{
                        background: "#ffd9e8",
                        borderLeft: "15px solid #fff",
                        paddingLeft: "30px",
                        fontSize: "26px",
                        fontWeight: "bold",
                        letterSpacing: "-1px",
                        height: "73px",
                        lineHeight: "75px",
                      }}
                    >
                      Order invoice
                    </div>
                  </td>
                  <td></td>
                </tr>
              </table>
              <br />
              <br />
              <h3>פרטי ההזמנה שלך</h3>
              <p>
                תודה שהזמנת אצלנו ,ההזמנה תאסף בימים הקרובים ותישלח לכתובת
                המעודכנת במערכת , באם יש בעיה ניתן לפנות למוקד בטלפון או בצ'אט
              </p>
              <br />
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tr>
                  <td
                    style={{
                      width: "50%",
                      background: "#eee",
                      padding: "20px",
                    }}
                  >
                    <strong>Date:</strong> 2021/05/26
                    <br />
                    <strong>Payment type:</strong> Credit Card VISA
                    <br />
                    <strong>Delivery type:</strong> Postnord
                    <br />
                  </td>
                  <td style={{ background: "#eee", padding: "20px" }}>
                    <strong>Order-nr:</strong> {numOrder !== "" && numOrder}
                    <br />
                    <strong>E-mail:</strong> {userDetails.mail}
                    <br />
                    <strong>Phone:</strong> {userDetails.phone}
                    <br />
                  </td>
                </tr>
              </table>
              <br />
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <table>
                      <tr>
                        <td style={{ verticalAlign: "text-top" }}>
                          <div className="iconDeliver"></div>
                        </td>
                        <td>
                          <strong>Delivery</strong>
                          <br />
                          Firstname Lastname
                          <br />
                          Queens high 17 B<br />
                          SE-254 57 Helsingborg
                          <br />
                          Sweden
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tr>
                        <td style={{ verticalAlign: "text-top" }}>
                          <div className="iconDelivery"></div>
                        </td>
                        <td>
                          <strong>Delivery</strong>
                          <br />
                          Firstname Lastname
                          <br />
                          Queens high 17 B<br />
                          SE-254 57 Helsingborg
                          <br />
                          Sweden
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <br />
              <table
                style={{
                  width: "100%",
                  borderTop: "1px solid #eee",
                  borderBottom: "1px solid #eee",
                  padding: "0 0 8px 0",
                }}
              >
                <tr>
                  <td>
                    <h3>Checkout details</h3>Your checkout made by VISA Card
                    **** **** **** 2478
                  </td>
                </tr>
              </table>
              <br />
              <div className="iconInvoice"></div>
              <h3>Your articles</h3>

              <table
                style={{
                  borderCollapse: "collapse",
                  borderBottom: "1px solid #eee",
                  width: "100%",
                }}
              >
                <tr>
                  <td style={{ width: "40%" }} class="column-header">
                    Article
                  </td>
                  <td style={{ width: "40%" }} class="column-header">
                    Category
                  </td>
                  <td style={{ width: "20%" }} class="column-header">
                    Price
                  </td>
                  <td style={{ width: "20%" }} class="column-header">
                    Amount
                  </td>
                  <td style={{ width: "20%" }} class="column-header">
                    Total
                  </td>
                </tr>
                {items.length > 0 &&
                  items.map((el) => (
                    <tr>
                      <td class="row1">
                        <span style={{ color: "#777", fontSize: "11px" }}>
                          #64000L
                        </span>
                        <br />
                        {el.title}
                      </td>
                      <td class="row1">
                        <span style={{ color: "#777", fontSize: "11px" }}>
                          #64000L
                        </span>
                        <br />
                        {el.category}
                      </td>
                      <td class="row1">
                        <span style={{ color: "#777", fontSize: "11px" }}>
                          #64000L
                        </span>
                        <br />
                        {el.price}
                      </td>
                      <td class="row1">
                        <span style={{ color: "#777", fontSize: "11px" }}>
                          #64000L
                        </span>
                        <br />
                        {el.amount}
                      </td>
                      <td class="row1">
                        <span style={{ color: "#777", fontSize: "11px" }}>
                          #64000L
                        </span>
                        <br />
                        {el.price * el.amount}
                      </td>
                    </tr>
                  ))}
              </table>
              <br />
              <table
                style={{ background: "#eee", padding: "20px", width: "100%" }}
              >
                <tr>
                  <td>
                    <table style={{ width: "300px", float: "right" }}>
                      <tr>
                        <td>
                          <strong>Sub-total:</strong>
                        </td>
                        <td style={{ textAlign: "right" }}>100 SEK</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Shipping fee:</strong>
                        </td>
                        <td style={{ textAlign: "right" }}>50 SEK</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tax 25%:</strong>
                        </td>
                        <td style={{ textAlign: "right" }}>31.25 SEK</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Grand total:</strong>
                        </td>
                        <td style={{ textAlign: "right" }}>187.50 SEK</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div class="alert">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
              </div>
              <div class="socialmedia">
                Follow us online <small>[FB] [INSTA]</small>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
export default Invoicing;
