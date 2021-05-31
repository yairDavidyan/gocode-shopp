import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./login.css";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
function Login() {
  const [openUser, setOpenUser] = useState(false);
  const [openManager, setOpenManager] = useState(false);

  const [open, setOpen] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,

      // backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
      backgroundColor: "#dfdcdc",
    },
    a: {
      color: "#f50057",
    },
  }));
  const classes = useStyles();

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
    setOpenManager(false);
  };

  return (
    <div className="containerBox">
      <div className="boxx">{/* <a>About us</a> */}</div>
      <div className="boxx"></div>
      <div className="boxx"></div>

      <div className="boxx">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <AccountCircleIcon className={classes.a} />
          </ListItemIcon>
          <ListItemText primary="Login" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
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
                    <Button onClick={handleCloseManager} color="primary">
                      login
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </ListItem>
          </List>
        </Collapse>
      </div>
    </div>
  );
}
export default Login;
