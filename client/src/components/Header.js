import "./header.css";
import bali from "../images/bali.png";
import Search from "./Search";

function Header() {
  return (
    <>
      <div className="container">
        <div className="box box1">
          {" "}
          <div
            className="HeaderH1"
            style={{ backgroundImage: `url(${bali})` }}
            src={bali}
            alt={"logo"}
          ></div>
        </div>
        <div className="box box2">
          <Search />
        </div>
      </div>
    </>
  );
}

export default Header;
