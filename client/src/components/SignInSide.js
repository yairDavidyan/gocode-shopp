import React, { createRef, useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CartContext from "./CartContext";
import IconButton from "@material-ui/core/IconButton";
import AlertError from "./AlertError";

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
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "150vh",
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
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btn: {
    position: "relative",
    left: "46%",
    top: "50px",
  },
  link: {
    cursor: "pointer",
  },
}));

export default function SignInSide({ close }) {
  const classes = useStyles();
  const inputTextEmail = createRef();
  const inputTextPassword = createRef();
  const [errorContent, setErrorContent] = useState(false);

  const {
    setOpenUser,
    setIsSignUp,
    setUserContent,
    setUserContentId,
    setTextError,
  } = useContext(CartContext);
  let name, lastName, id;
  function openSignUp() {
    close();
    setIsSignUp(true);
  }
  function signInUser() {
    fetch("/api/customer")
      .then((res) => res.json())
      .then((user) => {
        user.map((el) => {
          if (
            el.mail === inputTextEmail.current.value &&
            el.password === inputTextPassword.current.value
          ) {
            name = el.name;
            lastName = el.lastName;
            id = el._id;
          }
        });
        console.log("name", name);

        if (name !== undefined) {
          setUserContent(`welcom ${name} ${lastName}`);
          setUserContentId(id);
          setOpenUser(false);
        } else {
          setErrorContent(true);
          setTextError("user not found");
        }
      });
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        {/* <CssBaseline /> */}
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {errorContent && <AlertError setErrorContent={setErrorContent} />}

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={inputTextEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={inputTextPassword}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={signInUser}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    className={classes.link}
                    onClick={openSignUp}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
              <IconButton
                aria-label="add an alarm"
                onClick={() => setOpenUser(false)}
                variant="contained"
                color="primary"
                href="#contained-buttons"
                className={classes.btn}
              >
                <ExitToAppIcon />
              </IconButton>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
