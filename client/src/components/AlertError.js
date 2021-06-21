import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import CartContext from "./CartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
    top: "33%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function AlertError({ setErrorContent }) {
  const classes = useStyles();
  const { textError, setTextError } = useContext(CartContext);

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
      </Alert>
    </div>
  );
}
export default AlertError;
