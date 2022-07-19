import { useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import usersDetails from "./usersDetails.css";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

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
  },
}));
function UsersDetails() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [numOrder, setNumOrder] = useState([]);
  const [phoneUser, setPhoneUser] = useState("");

  const handleOpen = (det) => {
    setOpen(true);
    setNumOrder(det);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [userDetails, setUserDetails] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  let ifPhone = false;
  function usersDetails() {
    fetch("/api/customer")
      .then((res) => res.json())
      .then((data) => {
        data.map((el) => {
          if (el.phone === phoneUser) {
            setUserDetails(el);
            setUserOrder(el.orders);
            ifPhone = true;
          }
        });
        if (ifPhone !== true) {
          setUserDetails([]);
          setUserOrder([]);
          alert("not found");
        }
      });
  }

  return (
    <>
      <div style={{ display: "grid", width: "100%" }}>
        <div style={{ margin: "0 auto" }}>
          <h1 className="header-details">details Users</h1>
          <div
            style={{
              border: "1px solid #b0ddee",
              backgroundColor: "rgb(238 205 97 / 28%)",
              borderRadius: "15px",

              textAlign: "center",
              width: "87%",
              margin: "0 auto",
              marginTop: "15px",
            }}
          >
            <TextField
              value={phoneUser}
              required
              id="filled-required"
              label="Phone user"
              onChange={(e) => setPhoneUser(e.target.value)}

              //variant="filled"
            />

            <IconButton aria-label="delete">
              <SearchIcon onClick={usersDetails} />
            </IconButton>
          </div>
        </div>
        <div className="name-user">
          <div className="details-user" style={{ display: "flex" }}>
            <h2 className="name-user-h2">Name: </h2>
            <div> {userDetails.name}</div>
          </div>
          <div className="details-user" style={{ display: "flex" }}>
            <h2 className="name-user-h2">Last name: </h2>
            <div> {userDetails.lastName}</div>
          </div>
          <div className="details-user" style={{ display: "flex" }}>
            <h2 className="name-user-h2">Phone: </h2>
            <div> {userDetails.phone}</div>
          </div>
          <div className="details-user" style={{ display: "flex" }}>
            <h2 className="name-user-h2">Mail: </h2>
            <div> {userDetails.mail}</div>
          </div>
          <div className="details-user" style={{ display: "flex" }}>
            <h2 className="name-user-h2">Adress: </h2>
            <div> {userDetails.adress}</div>
          </div>
          <div className="details-user" style={{ display: "flex" }}>
            <h2 className="name-user-h2">Id: </h2>
            <div> {userDetails._id}</div>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <table>
            <tr>
              <th>מספר הזמנה</th>
              <th>עלות</th>

              <th>שולם</th>
              <th>תאריך</th>
            </tr>
            {userOrder.map((el) => (
              <tr>
                <td>
                  <a onClick={handleOpen} style={{ cursor: "pointer" }}>
                    {el.numberOrder}
                  </a>
                </td>
                <td>{el.cost}</td>
                <td>{el.ifPay.toString() ? "paid " : "no paid "}</td>
                <td>{el.date}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>

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
            <h2 id="transition-modal-title">Product</h2>
            {/* <div>munber order: {numOrder.numberOrder}</div>
            <div>cost : {numOrder.cost}</div>
            <div>ifPay : {numOrder.ifPay}</div>
            <div>customer : {numOrder.customer}</div>
            <div>id : {numOrder._id}</div> */}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
export default UsersDetails;
