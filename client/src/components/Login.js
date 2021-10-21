import "./login.css";
import { createRef, Fragment, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge, withStyles } from "@material-ui/core";

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
import { Fade, IconButton, makeStyles, Menu, Modal } from "@material-ui/core";
import SignInSide from "./SignInSide";
import SignUp from "./SignUp";
import UsersDetails from "./UsersDetails";
import Backdrop from "@material-ui/core/Backdrop";

function Login() {
  const {
    setUpdateSale,
    setTotalProducts,
    isSignUp,
    categories,
    setProducts,

    setTotalFilter,
    setProductsFilter,
    setMinMax,
    setValue,
    calMin,
    calMax,
  } = useContext(CartContext);
  let textInputPrice = createRef();
  let textInputName = createRef();
  let textInputDes = createRef();
  let textInputUrl = createRef();
  const StyledBadge = withStyles((theme) => ({
    badge: {},
  }))(Badge);

  function updateSaleFun() {
    const addProduct = {
      title: textInputName.current.value,
      price: +textInputPrice.current.value,
      description: textInputDes.current.value,
      category: category,
      image: textInputUrl.current.value,
      amount: 0,
    };

    fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addProduct),
    }).then(
      fetch("/api/product")
        .then((res) => res.json())
        .then(
          (data) => (
            setProducts(data),
            setTotalFilter((prev) => prev + 1),
            setTotalProducts((prev) => prev + 1),
            setProductsFilter(data),
            setMinMax(data),
            setValue([calMin(data), calMax(data)])
          )
        )
    );
    setOpen(false);
  }

  const [openManager, setOpenManager] = useState(false);
  const [open, setOpen] = useState(false);

  const [passwordManager, setPasswordManager] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const {
    setIsCart,
    items,
    isCart,
    ifManager,
    setIfManager,
    setUpdateProduct,
    openUser,
    setOpenUser,
    userContent,
    setUserContent,
    setOpenUsersDetalies,
    openUsersDetalies,
  } = useContext(CartContext);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("rgb(255, 213, 79)");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  function change(e) {
    setCategory(e);
  }
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

    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
      backgroundColor: color,
    },
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
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    test: {
      position: "fixed !important",
      zIndex: "0 !important",
      inset: "0px !important",
    },
  }));
  const classes = useStyles();

  function signOut() {
    setIfManager(false);
    setListTipe(["Inbox", "Starred", "Send email", "Drafts"]);
    setUpdateProduct(false);
    setUpdateSale(false);
    setColor("rgb(255, 213, 79)");

    setUserContent("Hello Guest");
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenManager = (passwordManager) => {
    if (passwordManager === "1") {
      setIfManager(true);
      setOpenManager(false);
      setListTipe(["update sale", "update product", "add product", "users"]);
      setColor("rgb(205 205 205)");
      setUserContent("Manager mode");
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
    } else if (text === "add product") {
      setOpen(true);
    } else if (text === "users") {
      setOpenUsersDetalies(true);
    }
  }

  const isMenuOpen = Boolean(anchorEl);
  const renderMenu = (
    <Menu
      className={classes.test}
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
        <div>
          <Modal
            className={classes.modal}
            open={openUser}
            onClose={handleCloseUser}
          >
            <SignInSide close={handleCloseUser} />
          </Modal>
        </div>
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
                <Fragment key={anchor}>
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
                </Fragment>
              ))}
            </div>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {userContent}
            {/* <a onClick={() => setOpenUser(true)}> log in</a> */}
          </Typography>
          <IconButton
            onClick={() => setIsCart(!isCart)}
            aria-label="cart"
            className={classes.a}
          >
            <StyledBadge
              badgeContent={
                items && items.reduce((total, curr) => total + curr.amount, 0)
              }
              color="secondary"
            >
              <ShoppingCartIcon fa-rotate-90 className={classes.iconShoping} />
            </StyledBadge>
          </IconButton>
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
      {isSignUp && <SignUp />}

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
            <div style={{ display: "grid", justifyContent: "center" }}>
              <h2 id="transition-modal-title">add product</h2>
              <select
                style={{ marginBottom: "0px" }}
                className="selectCategory"
                onChange={(e) => change(e.target.value)}
              >
                <option aria-label="None" value="" />
                {categories.map((categories) => (
                  <option value={categories} key={categories}>
                    {categories}
                  </option>
                ))}
              </select>
              <TextField
                type="url"
                autoComplete="off"
                inputRef={textInputUrl}
                id="standard-basic1"
                label="url"
              />

              <TextField
                inputRef={textInputName}
                autoComplete="off"
                id="standard-basic2"
                label="name"
              />
              <TextField
                type="number"
                inputRef={textInputPrice}
                autoComplete="off"
                id="standard-basic3"
                label="price"
              />
              <TextField
                inputRef={textInputDes}
                autoComplete="off"
                id="standard-basic4"
                label="des"
              />
            </div>
            <Button
              style={{ position: "relative", top: "10px", left: "25%" }}
              onClick={() => updateSaleFun()}
              variant="outlined"
              color="primary"
            >
              submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default Login;
