import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import CartContext from "./CartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function AlertError({ setErrorContent }) {
  const classes = useStyles();
  const { textError, setTextError, setOpenUser } = useContext(CartContext);

  return (
    <div className={classes.root}>
      <Alert
        severity="error"
        onClose={() => {
          setErrorContent(false);
        }}
      >
        <AlertTitle>Error</AlertTitle>
        <strong>{textError}</strong>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpenUser(true);
            setErrorContent(false);
          }}
        >
          Log in
        </a>
      </Alert>
    </div>
  );
}
export default AlertError;
