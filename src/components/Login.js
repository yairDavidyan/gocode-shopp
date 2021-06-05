import "./login.css";
import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { ExpandLess, ExpandMore, SingleBedOutlined } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import CartContext from "./CartContext";
import UpdateSale from "./UpdateSale";

function Login() {
  const { updateSale, setUpdateSale } = useContext(CartContext);
  const [openUser, setOpenUser] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const [passwordManager, setPasswordManager] = useState("");
  const [open, setOpen] = useState(false);
  const [ifManager, setIfManager] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
      backgroundColor: "#dfdcdc",
    },
    a: {
      fontSize: "22px",
    },
    list: {
      height: "24px",
    },

    icon: {
      color: "black",
      height: "0px",
      padding: "0px",
    },
    containedPrimary: {
      color: "#202020",
      backgroundColor: "#fc0738 ",
      marginBottom: "5px",
      height: "21px",
    },
    nested: {
      backgroundColor: "black",
      paddingLeft: "0px",
      paddingRight: "0px",
      // position: "absolute",
    },
  }));
  const classes = useStyles();

  function signOut() {
    setIfManager(false);
    setOpen(false);
  }
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickOpenUser = () => {
    setOpenUser(true);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };
  const handleClickOpenManager = () => {
    setOpenManager(true);
  };

  const handleCloseManager = () => {
    if (passwordManager === "1") {
      setIfManager(true);
    }
    setOpenManager(false);
  };

  return (
    <div className="containerBox">
      {ifManager ? (
        <div className="boxx">
          <Button
            className={classes.containedPrimary}
            onClick={() => setUpdateSale(true)}
            variant="contained"
            color="primary"
            component="span"
          >
            Update sale
          </Button>
        </div>
      ) : (
        <div className="boxx"></div>
      )}
      {updateSale && <UpdateSale />}
      <div className="boxx"></div>
      <div className="boxx"></div>
      {!ifManager ? (
        <div className="loginOutIn">
          <ListItem className={classes.list} button onClick={handleClick}>
            <AccountCircleIcon className={classes.a} />

            {/* <ListItemText primary="Login" /> */}
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            style={{ position: "absolute" }}
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <div>
                  <Button color="primary" onClick={handleClickOpenUser}>
                    User login
                  </Button>
                  <Dialog
                    open={openUser}
                    onClose={handleCloseUser}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">User login</DialogTitle>

                    <DialogContent>
                      <DialogContentText></DialogContentText>

                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="User name"
                        type="text"
                        fullWidth
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="text"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseUser} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleCloseUser} color="primary">
                        login
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </ListItem>

              <ListItem button className={classes.nested}>
                <div>
                  <Button color="primary" onClick={handleClickOpenManager}>
                    Manager login
                  </Button>
                  <Dialog
                    open={openManager}
                    onClose={handleCloseManager}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Manager login
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText></DialogContentText>
                      <TextField
                        value={passwordManager}
                        onChange={(e) => setPasswordManager(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="text"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseManager} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleCloseManager(passwordManager)}
                        color="primary"
                      >
                        login
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </ListItem>
            </List>
          </Collapse>
        </div>
      ) : (
        <div className="loginOutIn">
          <IconButton
            onClick={() => signOut()}
            aria-label="delete"
            className={classes.icon}
          >
            <ExitToAppIcon />

            <h1>sign out</h1>
          </IconButton>
        </div>
      )}
    </div>
  );
}
export default Login;
