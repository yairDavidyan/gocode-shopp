import React, { useContext, useState } from "react";
import CartContext from "./CartContext";
import women from "../images/women.jpg";
import jewerly from "../images/jewerly.jpg";
import men from "../images/men.jpg";
import elecronic from "../images/elecronic.jpg";
import "./sliderImage.css";

function Slide({ background, text, link, active }) {
  const { changeDisplay } = useContext(CartContext);
  let slideStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "1350px 200px",
  };
  return (
    <div className="slider__slide" data-active={active} style={slideStyle}>
      <div className="slider__slide__text">
        <button onClick={() => changeDisplay(text)}>{text}</button>
      </div>
    </div>
  );
}

function SliderImage() {
  let slides = [
    {
      background: `"${women}"`,
      text: "women's clothing",
      link: "https://unsplash.com/anthonydelanoix",
    },
    {
      background: `"${jewerly}"`,
      text: "jewelery",
      link: "https://unsplash.com/aleskrivec",
    },
    {
      background: `"${elecronic}"`,
      text: "electronics",
      link: "https://unsplash.com/intrepid",
    },
    {
      background: `"${men}"`,
      text: "men's clothing",
      link: "https://unsplash.com/intrepid",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    let slide = activeSlide + 1 < slides.length ? activeSlide + 1 : 0;
    setActiveSlide(slide);
  };

  function previousSlide() {
    let slide = activeSlide - 1 < 0 ? slides.length - 1 : activeSlide - 1;
    setActiveSlide(slide);
  }

  setTimeout(() => {
    nextSlide();
  }, 3000);

  return (
    <div className="slider">
      {slides.map((slide, index, array) => (
        <Slide
          background={slide.background}
          text={slide.text}
          active={index === activeSlide}
        />
      ))}
      <div className="slider__next" onClick={nextSlide}>
        <i className="fa fa-3x fa-arrow-circle-right"></i>
      </div>
      <div className="slider__previous" onClick={previousSlide}>
        <i className="fa fa-3x fa-arrow-circle-left"></i>
      </div>
    </div>
  );
}

export default SliderImage;
