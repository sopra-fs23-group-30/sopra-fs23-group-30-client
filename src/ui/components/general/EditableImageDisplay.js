import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react'

function EditableImageDisplay(props) {
    const [firstImage, setFirstImage] = useState(0);
    const [images, setImages] = useState(props.images);
    const [canEdit, setCanEdit] = useState(props.canEdit);

    useEffect(() => {
        setImages(props.images);
    }, [props.images]);

    const image = (styling, image) => {
        return (
            <>
                <img
                    src={image.imageURL}
                    alt="image"
                    className={styling}
                />
                {!canEdit ? (
                    <XMarkIcon
                        height={18}
                        color="red"
                        onClick={() => {props.handleDeleteImage(image.imageURL)}}
                        className="inline-block align-middle text-red-500"
                    />
                ) : (<></>)}
            </>
        )
    }

    const imageContainer = () => {
            if (images.length == 0) {
                return (
                <div className="">
                    <p>No images here yet.</p>
                </div>
            )
        }
        else if (images.length == 1) {
            return (
                <div className="container">
                    {image("w-full h-full rounded shadow-sm", images[0])}
                </div>
            )
        }
        else if (images.length < 5) {
            return (
                <div className="container grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {image("w-full h-full col-span-1 row-span-1 rounded shadow-sm", images[(0 + firstImage) % images.length])}
                    {image("w-full h-full col-span-1 row-span-1 rounded shadow-sm", images[(1 + firstImage) % images.length])}
                </div>
            )
        }
        else if (images.length >= 5) {
            return (
                <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {image("w-full h-full col-span-2 row-span-2 rounded shadow-sm lg:col-start-3 lg:row-start-1", props.isLink, images[(0 + firstImage) % images.length])}
                    {image("w-full h-full", images[(1 + firstImage) % images.length])}
                    {image("w-full h-full", images[(2 + firstImage) % images.length])}
                    {image("w-full h-full", images[(3 + firstImage) % images.length])}
                    {image("w-full h-full", images[(4 + firstImage) % images.length])}
                </div>
            )
        }
    }

    return (
        <>
            <div className='pb-4'>
                {imageContainer()}
            </div>
            {!canEdit ? (
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
            ) : (<></>)}
        </>
        )
    }
    
export default EditableImageDisplay;