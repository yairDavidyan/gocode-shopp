import React, { createRef, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/styles";
import Container from "@mui/material/Container";
import { Modal } from "@mui/material";
import CartContext from "./CartContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = styled((theme) => ({
  con: {
    backgroundColor: "white",
    borderRadius: "5px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    cursor: "pointer",
  },
}));

export default function SignUp() {
  let textInputName = createRef();
  let textInputLname = createRef();
  let textInputPhone = createRef();
  let textInputEmail = createRef();
  let textInputPassword = createRef();
  const classes = useStyles();
  const { isSignUp, setIsSignUp, setOpenUser } = useContext(CartContext);

  function signUpUser() {
    const userObj = {
      name: textInputName.current.value,
      lastName: textInputLname.current.value,
      phone: textInputPhone.current.value,
      mail: textInputEmail.current.value,
      //adress: textInputName.current.value,
      password: textInputPassword.current.value,
    };
    console.log(userObj);

    fetch("/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    setIsSignUp(false);
  }
  const handleClose = () => {
    setIsSignUp(false);
  };
  function openSignIn() {
    handleClose();
    setOpenUser(true);
  }

  return (
    <Modal open={isSignUp} onClose={handleClose}>
      <Container component="main" maxWidth="xs" className={classes.con}>
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={textInputName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  inputRef={textInputLname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Phone"
                  label="Phone"
                  name="Phone"
                  autoComplete="Phone"
                  inputRef={textInputPhone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={textInputEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={textInputPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              onClick={signUpUser}
              //  type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  className={classes.link}
                  onClick={openSignIn}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Modal>
  );
}
