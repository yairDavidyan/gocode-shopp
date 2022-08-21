import { styled } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { createRef, useContext, useState } from "react";
import CartContext from "./CartContext";
import AlertError from "./AlertError";

const useStyles = styled((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "1px solid #f50057",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    marginRight: "3px",
    padding: "2px",
    // padding: 10,
  },
}));
function Search() {
  const serchText = createRef();
  const [openError, setOpenError] = useState(false);
  const classes = useStyles();
  const {
    setProducts,
    products,
    setValue,
    calMin,
    calMax,
    setTotalProducts,
    setTotalFilter,
    setProductsFilter,
    setMinMax,
    setTextError,
  } = useContext(CartContext);

  function serchProduct() {
    fetch(`/api/product/?title=${serchText.current.value}`)
      .then((res) => res.json())
      .then((data) =>
        data.length > 0
          ? (setProducts(data),
            setTotalFilter(data.length),
            setTotalProducts(data.length),
            setProductsFilter(data),
            setMinMax(data),
            setValue([calMin(data), calMax(data)]),
            setOpenError(false))
          : (setTextError("not founded product , change serch"),
            setOpenError(true))
      );
  }
  return (
    <>
      {/* {openError && <AlertError setErrorContent={setOpenError} />} */}

      <div className="search">
        <Paper component="form" className={classes.root}>
          <InputBase
            type="search"
            onChange={serchProduct}
            inputRef={serchText}
            className={classes.input}
            placeholder="Search ..."
            inputProps={{ "aria-label": "search" }}
          />
          <Divider className={classes.divider} orientation="vertical" />

          <IconButton
            //  type="submit"
            // onClick={serchProduct}
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        {openError && (
          <div style={{ color: "red", fontWeight: "bold" }}>not found</div>
        )}
      </div>
    </>
  );
}
export default Search;
