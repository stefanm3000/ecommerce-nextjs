import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

const LeftArrow = styled(MdKeyboardArrowLeft)``;

const RightArrow = styled(MdKeyboardArrowRight)``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  position: relative;
  bottom: 9rem;
  width: 30rem;

  @media (max-width: 550px) {
    width: 20rem;
  }
`;

const Carousel = (props) => {
  return (
    <CarouselProvider
      naturalSlideWidth={120}
      naturalSlideHeight={100}
      totalSlides={3}
      style={{ justifyItems: "center", alignItems: "center", margin: "0 auto" }}
    >
      <Slider
        style={{
          height: "15rem",
          width: "18rem",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <Slide
          index={0}
          style={{
            height: "15rem",
            width: "18rem",
          }}
        >
          <img src={props.imgUrl} />
        </Slide>
        <Slide
          index={1}
          style={{
            height: "15rem",
            width: "18rem",
          }}
        >
          <img src={props.imgUrl2} />
        </Slide>
        <Slide
          index={2}
          style={{
            height: "15rem",
            width: "18rem",
          }}
        >
          <img src={props.imgUrl3} />
        </Slide>
      </Slider>
      <ButtonContainer>
        <ButtonBack
          style={{
            zIndex: "10",
            background: "transparent",
            border: "none",
            fontSize: "3rem",
            color: "gray",
            opacity: "89%",
          }}
        >
          <LeftArrow />
        </ButtonBack>
        <ButtonNext
          style={{
            zIndex: "10",
            background: "transparent",
            border: "none",
            fontSize: "3rem",
            color: "gray",
            opacity: "89%",
          }}
        >
          <RightArrow />
        </ButtonNext>
      </ButtonContainer>
    </CarouselProvider>
  );
};

export default Carousel;
