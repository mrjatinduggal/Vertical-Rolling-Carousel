import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Slide from "./Slide";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: relative;
  display: flex;

  height: 60px;
  margin: 0 auto;
  width: 20%;
  margin-top: 1rem;
  justify-content: space-between;
  z-index: 1000;
`;

const NavBtn = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 3px;
`;

function mod(a, b) {
  return ((a % b) + b) % b;
}

const VerticalCarousel = ({
  slides,
  goToSlide,
  showNavigation,
  offsetRadius,
  animationConfig,
  scrollUp,
  scrollDown,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    moveSlide(1);
  }, [scrollUp]);

  useEffect(() => {
    moveSlide(-1);
  }, [scrollDown]);

  const modBySlidesLength = (index) => {
    return mod(index, slides.length);
  };

  const moveSlide = (direction) => {
    setIndex(modBySlidesLength(index + direction));
  };

  const clampOffsetRadius = (offsetRadius) => {
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  };

  const getPresentableSlides = () => {
    let offsetRadiusClamped = clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -offsetRadiusClamped; i < 1 + offsetRadiusClamped; i++) {
      presentableSlides.push(slides[modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  };

  return (
    <>
      <Wrapper>
        {getPresentableSlides().map((slide, presentableIndex) => (
          <Slide
            key={slide.key}
            content={slide.content}
            moveSlide={moveSlide}
            offsetRadius={clampOffsetRadius(offsetRadius)}
            index={presentableIndex}
            animationConfig={animationConfig}
          />
        ))}
      </Wrapper>
      {showNavigation && (
        <NavigationButtons>
          <button
            style={{ padding: "10px 20%", cursor: "pointer" }}
            onClick={() => moveSlide(1)}
          >
            UP
          </button>
          <button
            style={{ padding: "10px 20%", cursor: "pointer" }}
            onClick={() => moveSlide(-1)}
          >
            DOWN
          </button>
        </NavigationButtons>
      )}
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          color: "white",
          marginTop: "10px",
        }}
      >
        GitHub: mrjatinduggal
      </div>
    </>
  );
};

VerticalCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      content: PropTypes.object,
    })
  ).isRequired,
  goToSlide: PropTypes.number,
  showNavigation: PropTypes.bool,
  offsetRadius: PropTypes.number,
  animationConfig: PropTypes.object,
};

VerticalCarousel.defaultProps = {
  offsetRadius: 2,
  animationConfig: { tension: 120, friction: 14 },
};

export default VerticalCarousel;
