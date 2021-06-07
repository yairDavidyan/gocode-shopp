import "./header.css";
import Slider from "@material-ui/core/Slider";
import { useContext, useState } from "react";
import CartContext from "./CartContext";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, IconButton, withStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import bali from "../images/bali.png";
import Search from "./Search";

function Header() {
  return (
    <>
      <div className="container">
        <div className="box box1">
          {" "}
          <span className="HeaderH1">
            <img style={{ marginTop: "30px" }} src={bali} alt={"logo"}></img>
          </span>
        </div>
        <div className="box box2">
          <Search />
        </div>
        <div className="box box3"></div>
      </div>
    </>
  );
}

export default Header;
