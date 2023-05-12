import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

function EditableImageDisplay(props) {
  const [firstImage, setFirstImage] = useState(0);
  const [images, setImages] = useState(props.images);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setImages(props.images);
    setCanEdit(props.canEdit);
  }, [props, firstImage]);

  const image = (styling, index) => {
    return (
      <>
        <img src={images[index].imageURL} alt="image" className={styling} />
        {canEdit ? (
          <XMarkIcon
            height={18}
            color="red"
            onClick={() => {
              props.handleDeleteImage(images[index].imageURL);
            }}
            className="inline-block align-middle text-red-500"
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  const nextButton = () => {
    return (
      <button
        className="absolute"
        onClick={() => {
          setFirstImage((firstImage + 1) % images.length);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    );
  };

  const imageContainer = () => {
    if (images.length == 0) {
      return (
        <div className="">
          <p>No images here yet.</p>
        </div>
      );
    } else if (images.length == 1) {
      return (
        <div className="container">
          {image("w-full h-full rounded shadow-sm", 0)}
        </div>
      );
    } else if (images.length < 5) {
      return (
        <div className="container grid grid-cols-1 gap-4 lg:grid-cols-2">
          {image(
            "w-full h-full col-span-1 row-span-1 rounded shadow-sm",
            (0 + firstImage) % images.length
          )}
          {image(
            "w-full h-full col-span-1 row-span-1 rounded shadow-sm",
            (1 + firstImage) % images.length
          )}
          {images.length > 2 ? <>{nextButton()}</> : <></>}
        </div>
      );
    } else if (images.length >= 5) {
      return (
        <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4">
          {image(
            "w-full h-full col-span-2 row-span-2 rounded shadow-sm lg:col-start-3 lg:row-start-1",
            images[(0 + firstImage) % images.length]
          )}
          {image("w-full h-full", (1 + firstImage) % images.length)}
          {image("w-full h-full", (2 + firstImage) % images.length)}
          {image("w-full h-full", (3 + firstImage) % images.length)}
          {image("w-full h-full", (4 + firstImage) % images.length)}
          {images.length > 5 ? <>{nextButton()}</> : <></>}
        </div>
      );
    }
  };

  return (
    <>
      <div className="pb-4">{imageContainer()}</div>
      {canEdit ? (
        <>
          <input
            type="file"
            name="uploadfile"
            id="img"
            className="hidden"
            onChange={props.handleAddImage}
          />
          <label
            for="img"
            className="text-white text-center focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-secondary hover:bg-primary focus:outline-none"
          >
            Add Photo
          </label>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditableImageDisplay;
