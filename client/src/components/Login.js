import "./login.css";
import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import CartContext from "./CartContext";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IconButton, makeStyles, Menu, Modal } from "@material-ui/core";
import SignInSide from "./SignInSide";

function Login() {
  const { setUpdateSale } = useContext(CartContext);
  const [openManager, setOpenManager] = useState(false);
  const [passwordManager, setPasswordManager] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { ifManager, setIfManager, setUpdateProduct, openUser, setOpenUser } =
    useContext(CartContext);
  const [listType, setListTipe] = useState([
    "Inbox",
    "Starred",
    "Send email",
    "Drafts",
  ]);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    // modal: {
    //   top: "800px",
    //   left: "900px",
    // },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    a: {
      fontSize: "22px",
    },
    icon: {
      color: "black",
      height: "0px",
      padding: "0px",
    },
    lable: {
      color: "black",
    },
    colorPrimary: {
      backgroundColor: "rgb(255, 213, 79)",
    },
  }));
  const classes = useStyles();

  function signOut() {
    setIfManager(false);
    setListTipe(["Inbox", "Starred", "Send email", "Drafts"]);
    setUpdateProduct(false);
    setUpdateSale(false);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleClickOpenUser = () => {
    setOpenUser(true);
    setAnchorEl(null);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };
  const handleClickOpenManager = () => {
    setOpenManager(true);
    setAnchorEl(null);
  };

  const handleOpenManager = (passwordManager) => {
    if (passwordManager === "1") {
      setIfManager(true);
      setOpenManager(false);
      setListTipe(["update sale", "update product", "settings", "users"]);
    }
  };
  const handleCloseManager = () => {
    setOpenManager(false);
  };

  function selectMenu(text) {
    console.log(text);
    if (text === "update sale") {
      setUpdateSale(true);
      setUpdateProduct(false);
    } else if (text === "update product") {
      setUpdateProduct(true);
      setUpdateSale(false);
    }
  }

  const isMenuOpen = Boolean(anchorEl);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div>
        <MenuItem onClick={handleClickOpenUser}>user Login</MenuItem>
        {/* <Dialog
          open={openUser}
          onClose={handleCloseUser}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">User login</DialogTitle> */}
        <div>
          <Modal
            className={classes.modal}
            open={openUser}
            onClose={handleCloseUser}
          >
            <SignInSide />
          </Modal>
        </div>
        {/* <DialogContent>
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
            </DialogContent> */}
        {/* <DialogActions>
              <Button onClick={handleCloseUser} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseUser} color="primary">
                login
              </Button>
            </DialogActions> */}
        {/* </Dialog> */}
        <Dialog
          open={openManager}
          onClose={handleOpenManager}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Manager login</DialogTitle>
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
              onClick={() => handleOpenManager(passwordManager)}
              color="primary"
            >
              login
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <MenuItem onClick={handleClickOpenManager}>manager login</MenuItem>
    </Menu>
  );

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {listType.map((text, index) => (
          <ListItem button onClick={() => selectMenu(text)} key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.colorPrimary} position="static">
        <Toolbar className={classes.lable}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <div>
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <MenuIcon onClick={toggleDrawer(anchor, true)}>
                    {anchor}
                  </MenuIcon>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bali Express
          </Typography>
          {ifManager ? (
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
          ) : (
            <IconButton
              className={classes.lable}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
export default Login;
