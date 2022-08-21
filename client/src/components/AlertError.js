import React, { useContext } from "react";
import { styled } from "@mui/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// or

import CartContext from "./CartContext";

const useStyles = styled((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function AlertError({ setErrorContent }) {
  const classes = useStyles();
  const { textError, setTextError, setOpenUser, userContent } =
    useContext(CartContext);

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
        {userContent === "Hello Guest" && (
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenUser(true);
              setErrorContent(false);
            }}
          >
            Log in
          </a>
        )}
      </Alert>
    </div>
  );
}
export default AlertError;
