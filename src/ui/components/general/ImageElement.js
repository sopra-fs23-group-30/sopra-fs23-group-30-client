import React, { useEffect, useState } from "react";

function ImageElement(props) {
  const [images, setImages] = useState(props.images);

  useEffect(() => {
    setImages(props.images);
  }, [props]);

  if (images == 0) {
    return (
      <div className="items-center justify-center text-sm">
        No images present
      </div>
    );
  } else if (images.length == 1) {
    return (
      <div className="w-full m-2 items-center">
        <img className="object-cover rounded" alt="test" src={images[0]} />
      </div>
    );
  } else if (images.length == 2) {
    return (
      <div className="w-full grid grid-rows-1 grid-cols-2 gap-4 m-2 items-center">
        <img
          className="row-span-1 col-span-1 object-cover rounded"
          alt="test"
          src={images[0].imageURL}
        />
        <img
          className="col-span-1 row-span-1 object-cover rounded"
          alt="test"
          src={images[1].imageURL}
        />
      </div>
    );
  } else if (images.length == 3) {
    return (
      <div className="w-full grid grid-rows-2 grid-cols-4 gap-4 m-2 items-center">
        <img
          className="row-span-3 col-span-3 object-cover rounded"
          alt="test"
          src={images[0].imageURL}
        />
        <img
          className="col-span-1 row-span-1 object-cover rounded"
          alt="test"
          src={images[1].imageURL}
        />
        <img
          className="col-span-1 row-span-1 object-cover rounded"
          alt="test"
          src={images[2].imageURL}
        />
      </div>
    );
  } else if (images.length >= 4) {
    return (
      <div className="w-full grid grid-rows-3 grid-cols-4 gap-4 m-2">
        <img
          className="row-span-3 col-span-3 object-cover rounded"
          alt="test"
          src={images[0].imageURL}
        />
        <img
          className="col-span-1 row-span-1 object-cover rounded"
          alt="test"
          src={images[1].imageURL}
        />
        <img
          className="col-span-1 row-span-1 object-cover rounded"
          alt="test"
          src={images[2].imageURL}
        />
        <img
          className="col-span-1 row-span-1 object-cover rounded"
          alt="test"
          src={images[3].imageURL}
        />
      </div>
    );
  }
}

export default ImageElement;
