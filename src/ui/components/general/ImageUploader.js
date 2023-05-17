import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import ImageUploading from "react-images-uploading";

function ImageUploader(props) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    props.onChange(
      imageList.map((image) => {
        return image.file;
      })
    );
  };

  return (
    <>
      <p className="text-sm">Updload Images here</p>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              className="w-1/3 h-16 bg-white rounded"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop
            </button>
            &nbsp;
            <button className="inline" onClick={onImageRemoveAll}>
              <div className="flex flex-col items-center ml-2">
                <XMarkIcon
                  height={18}
                  color="red"
                  className="inline-block align-middle text-red-500"
                />
                <p className="text-sm">Delete all</p>
              </div>
            </button>
            {imageList.map((image, index) => (
              <div key={index} className="w-1/3 py-4 image-item">
                <img src={image["data_url"]} alt="" width="full" />
                <div className="flex flex-row justify-around mt-2 image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>
                    <div className="flex flex-col items-center ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      <p className="text-sm">Exchange</p>
                    </div>
                  </button>
                  <button onClick={() => onImageRemove(index)}>
                    <div className="flex flex-col items-center ml-2">
                      <XMarkIcon
                        height={18}
                        color="red"
                        className="inline-block align-middle text-red-500"
                      />
                      <p className="text-sm">Delete</p>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </>
  );
}

export default ImageUploader;
