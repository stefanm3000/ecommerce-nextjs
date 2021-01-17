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

const Carousel = (props) => {
  return (
    <CarouselProvider
      naturalSlideWidth={120}
      naturalSlideHeight={100}
      totalSlides={3}
      style={{ marginTop: "120px", justifyItems: "center", margin: "0 auto" }}
    >
      <Slider
        style={{
          height: "15rem",
          width: "18rem",
          margin: "0 auto",
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
            margin: "0 auto",
          }}
        >
          <img src={props.imgUrl2} />
        </Slide>
        <Slide
          index={2}
          style={{
            height: "15rem",
            width: "18rem",
            margin: "0 auto",
          }}
        >
          <img src={props.imgUrl3} />
        </Slide>
      </Slider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          position: "relative",
          bottom: "9rem",
          width: "30rem",
        }}
      >
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
      </div>
    </CarouselProvider>
  );
};

export default Carousel;
