import "./timer.css";
import { useState, useEffect, useContext } from "react";
import CartContext from "./CartContext";

function Timer() {
  const { setIsSale, isSale, setPercent, date, setDate, percent } =
    useContext(CartContext);
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let difference = +new Date(date) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      setIsSale(true);
      //setPercent(20);
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      setIsSale(false);
      setPercent(0);
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <li>
        <span>{timeLeft[interval]}</span>
        {`${interval}`}
      </li>
    );
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {isSale ? (
        <div>
          <div
            style={{
              backgroundColor: "#ffd54f",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {/* <h1
              style={{
                fontWeight: "bold",
                display: "flex",
                color: "red",
                justifyContent: "center",
                backgroundColor: "yellow",
                msTransform: "skewY(20deg)",
                transform: "skewY(-20deg)",
                height: "17px",
              }}
            >
              SALE {year}
            </h1> */}
            <h1 className="h1Percent blink_me">{percent}</h1>
            <span className="container1">
              {timerComponents.length ? (
                timerComponents
              ) : (
                <span>Time's up!</span>
              )}
            </span>
            <h1 className="h1Percent blink_me">{percent}</h1>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default Timer;
