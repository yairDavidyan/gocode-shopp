import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/styles";
import CartContext from "./CartContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = styled((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Snackbars() {
  const { snackBar, setSnackBar, message } = useContext(CartContext);

  const classes = useStyles();
  //const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={snackBar} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default Snackbars;
