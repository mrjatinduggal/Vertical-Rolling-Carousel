import React from "react";
import styled from "@emotion/styled";
import { Spring} from "react-spring/renderprops";
import { withGesture } from "react-with-gesture";

const SlideContainer = styled.div`
  position: absolute;
  height: 100px;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`;

const SlideCard = styled.div`
  position: relative;
  max-width: 50%;
  min-width: 30%;
  width: 150vw;
  height: 100%;
  background: white;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`;

function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  moveSlide,
  delta,
  down,
  up
}) {
  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

  const offsetCardClick = (i) => {
    console.log(i);
  };

  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle === 0 && down) {
    translateY += delta[1] / (offsetRadius + 1);
    if (translateY > -40) {
      moveSlide(-1);
    }
    if (translateY < -100) {
      moveSlide(1);
    }
  }
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }

  return (
    <Spring
      to={{
        transform: `translateX(0%) translateY(${translateY}%) scaleX(${
          offsetFromMiddle === -2
            ? 0.8
            : offsetFromMiddle === -1
            ? 0.9
            : offsetFromMiddle === 0
            ? 1
            : offsetFromMiddle === 1
            ? 0.9
            : 0.8
        })`,
        top: `${
          offsetFromMiddle === -2
            ? 30
            : offsetFromMiddle === -1
            ? 43
            : offsetFromMiddle === 0
            ? 50
            : offsetFromMiddle === 1
            ? 57
            : 70
        }%`,
        opacity: distanceFactor * distanceFactor + 0.45
      }}
      config={animationConfig}
    >
      {(style) => (
        <SlideContainer
          style={{
            ...style,

            zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2)
          }}
        >
          <SlideCard
            style={{ boxShadow: "0 0 10px 1px rgba(0,0,0,0.1)" }}
            onClick={() => moveSlide(offsetFromMiddle)}
          >
            {content}
          </SlideCard>
        </SlideContainer>
      )}
    </Spring>
  );
}

export default withGesture()(Slide);
