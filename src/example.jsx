import React, { useState, useCallback } from "react";
import VerticalCarousel from "./VerticalCarousel";
import { config } from "react-spring";

const slides = [
  {
    key: 1,
    content: "1",
  },
  {
    key: 2,
    content: "2",
  },
  {
    key: 3,
    content: "3",
  },
  {
    key: 4,
    content: "4",
  },
  {
    key: 5,
    content: "5",
  },
  {
    key: 6,
    content: "6",
  },
  {
    key: 7,
    content: "7",
  },
  {
    key: 8,
    content: "8",
  },
  {
    key: 9,
    content: "9",
  },
  {
    key: 10,
    content: "10",
  },
];

const Example = () => {
  const [goToSlide, setGoToSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showNavigation, setShowNavigation] = useState(true);
  const [animationConfig] = useState(config.gentle);

  const [scrollUp, setScrollUp] = useState(0);
  const [scrollDown, setScrollDown] = useState(0);

  const handleWheel = useCallback((event) => {
    if (event.deltaY < 0) {
      // Scrolling up
      setScrollUp((prev) => prev + 1);
    } else {
      // Scrolling down
      setScrollDown((prev) => prev + 1);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        height: "600px",
        margin: "0 auto",
        background: "black",
      }}
      onWheel={handleWheel}
    >
      <VerticalCarousel
        slides={slides}
        offsetRadius={offsetRadius}
        showNavigation={showNavigation}
        animationConfig={animationConfig}
        scrollUp={scrollUp}
        scrollDown={scrollDown}
      />
    </div>
  );
};

export default Example;
