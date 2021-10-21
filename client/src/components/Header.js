import "./header.css";
import bali from "../images/bali.png";
import Search from "./Search";
import { Button } from "@material-ui/core";

function Header() {
  return (
    <>
      <div className="container">
        <img
          onClick={() => window.location.reload(false)}
          className="HeaderH1"
          style={{ backgroundImage: `url(${bali})` }}
          src={bali}
          alt={"logo"}
        ></img>

        <div className="">
          <Search />
        </div>
      </div>
    </>
  );
}

export default Header;
