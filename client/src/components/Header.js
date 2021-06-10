import "./header.css";
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
