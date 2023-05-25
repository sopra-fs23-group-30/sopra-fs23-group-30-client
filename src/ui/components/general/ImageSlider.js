import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

function ImageSlider(props) {
  const [firstImage, setFirstImage] = useState(0);
  const [canEdit, setCanEdit] = useState(false);
  const [images, setImages] = useState(props.images);

  useEffect(() => {
    setImages(props.images);
    setCanEdit(props.canEdit);
  }, [props, firstImage]);

  const prev = () => {
    let next = firstImage - 1;
    if (next < 0) {
      next = images.length - 1;
    }
    setFirstImage(next);
  };

  const next = () => {
    setFirstImage((firstImage + 1) % images.length);
  };

  const simpleImage = (index) => {
    return (
      <div
        style={{
          backgroundImage: "url(" + images[index].url + ")",
          backgroundSize: "cover",
        }}
        className="relative w-full h-full object-cover rounded"
      >
        {canEdit ? (
          <XMarkIcon
            className="absolute top-2 right-2 w-10"
            onClick={props.onChange(images[index].imageURL)}
          />
        ) : (
          <></>
        )}
      </div>
    );
  };

  const noImage = () => {
    return (
      <div className="w-full aspect-[8/3] p-2 items-center justify-center text-sm">
        No images present
      </div>
    );
  };

  const singleImage = () => {
    return (
      <div className="w-full aspect-[8/3] justify-center p-2">
        {simpleImage(0)}
      </div>
    );
  };

  const doubleImage = () => {
    return (
      <div className="w-full aspect-[8/3] grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-2">
        <div className="w-full aspect-[4/3] col-span-1 row-span-1 items-center justify-center">
          {simpleImage(0)}
        </div>
        <div className="w-full aspect-[4/3] col-span-1 row-span-1 items-center justify-center">
          {simpleImage(1)}
        </div>
      </div>
    );
  };

  const lessThanFiveImage = () => {
    return (
      <div className="group w-full aspect-[8/3] relative grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-2">
        <div className="w-full aspect-[4/3] col-span-1 row-span-1 items-center justify-center">
          {simpleImage(firstImage)}
        </div>
        <div className="w-full aspect-[4/3] col-span-1 row-span-1 items-center justify-center">
          {simpleImage((firstImage + 1) % images.length)}
        </div>
        <div className="invisible group-hover:visible">
          <ArrowLeftIcon
            className="hover:cursor-pointer absolute w-10 inset-y-0 left-2 top-0 bottom-0 m-auto bg-white bg-opacity-30 rounded-full"
            onClick={prev}
          />
          <ArrowRightIcon
            className="hover:cursor-pointer absolute w-10 inset-y-0 right-2 top-0 bottom-0 m-auto bg-white bg-opacity-30 rounded-full"
            onClick={next}
          />
        </div>
      </div>
    );
  };

  const selector = () => {
    if (images.length === 0) {
      return noImage();
    } else if (images.length === 1) {
      return singleImage();
    } else if (images.length === 2) {
      return doubleImage();
    } else {
      return lessThanFiveImage();
    }
  };

  return (
    <div className="w-full p-4 justify-center items-center">{selector()}</div>
  );
}

export default ImageSlider;
