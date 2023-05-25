import { Carousel } from "flowbite-react";

function ImageSlider(props) {
  return (
    <div className={props.className}>
      {props.imageUrls ? (
        <Carousel slideInterval={5000}>
          {props.imageUrls.map((obj) => (
            <img key={obj.imageURL} src={obj.imageURL} alt="flat room img" />
          ))}
        </Carousel>
      ) : (
        <Carousel slideInterval={5000}>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="no img"
          />
        </Carousel>
      )}
    </div>
  );
}

export default ImageSlider;
