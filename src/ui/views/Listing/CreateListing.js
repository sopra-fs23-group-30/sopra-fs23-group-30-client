import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { api } from "helpers/api";
import { useState } from "react";
import { decodeToken } from "react-jwt";
import EditableAddress from "ui/components/general/EditableAddress";
import EditableCheckbox from "ui/components/general/EditableCheckbox";
import { useNavigate } from "react-router-dom";
import ImageUploader from "ui/components/general/ImageUploader";

export default function CreateListing() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [googleMapsData, setGoogleMapsData] = useState({
    address: "",
    coordinates: {
      lat: null,
      lng: null,
    },
  });
  const [pricePerMonth, setPricePerMonth] = useState();
  const [perfectFlatmateDescription, setPerfectFlatmateDescription] =
    useState();
  const [images, setImages] = useState([]);
  const [petsAllowed, setPetsAllowed] = useState(true);
  const [elevator, setElevator] = useState(true);
  const [dishwasher, setDishwasher] = useState(true);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [googleMapsDataError, setGoogleMapsDataError] = useState("");
  const [pricePerMonthError, setPricePerMonthError] = useState("");
  const [perfectFlatmateDescriptionError, setPerfectFlatmateDescriptionError] =
    useState("");
  const [imagesError, setImagesError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!title) {
      setTitleError("Please enter a title for your listing");
    } else {
      setTitleError("");
    }
    if (!description) {
      setDescriptionError("Please enter a description for your listing");
    } else {
      setDescriptionError("");
    }
    if (!googleMapsData.coordinates.lat || !googleMapsData.coordinates.lng) {
      setGoogleMapsDataError("Please enter a valid address for your listing");
    } else {
      setGoogleMapsDataError("");
    }
    if (!pricePerMonth) {
      setPricePerMonthError("Please enter a price per month");
    } else {
      setPricePerMonthError("");
    }
    if (!perfectFlatmateDescription) {
      setPerfectFlatmateDescriptionError(
        "Please enter a description for your perfect flatmate"
      );
    } else {
      setPerfectFlatmateDescriptionError("");
    }
    if (!images[0]) {
      setImagesError("Please upload at least one image of the listing");
    } else {
      setImagesError("");
    }
    return title &&
      description &&
      googleMapsData &&
      pricePerMonth &&
      perfectFlatmateDescription &&
      images
      ? true
      : false;
  };

  const saveListing = async (e) => {
    if (validate()) {
      let token = localStorage.getItem("authtoken");
      const decoded = decodeToken(token);
      const userId = decoded.userId;

      const requestBody = JSON.stringify({
        title,
        description,
        address: googleMapsData.address,
        lattitude: googleMapsData.coordinates.lat,
        longitude: googleMapsData.coordinates.lng,
        pricePerMonth,
        perfectFlatmateDescription,
        listerId: userId,
        imagesJson: "[]",
        petsAllowed: petsAllowed,
        elevator: elevator,
        dishwasher: dishwasher,
      });

      const formData = new FormData();
      formData.append("body", requestBody);
      images.forEach((image) => {
        formData.append("files", image, image.name);
      });

      let response = await api
        .post("/listings", formData)
        .catch(function (error) {
          //display error
          return;
        });

      if (response.status === 201) {
        window.location.href = "/";
      }
    } else {
      return;
    }
  };

  return (
    <div className="px-2 py-2.5 sm:px-4 rounded px-4 md:mx-48">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <div className="group">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white group-hover:text-blue-600"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 mr-2 hover:text-blue-600 text-gray-400 group-hover:text-blue-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                ></path>
              </svg>
              Back
            </button>
          </div>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href="/createlisting"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                New Listing
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-2 pt-4">
        <div>
          <div className="mb-1 block">
            <Label htmlFor="small" value="Title" />
          </div>
          <TextInput
            id="small"
            color={titleError === "" ? "primary" : "failure"}
            type="text"
            className="text-sm"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {titleError !== "" && (
            <p className="text-sm text-red-500">{titleError}</p>
          )}
        </div>

        <div>
          <div className="mb-1 block">
            <Label htmlFor="small" value="Description" className="text-sm" />
          </div>
          <Textarea
            className="text-sm"
            color={descriptionError === "" ? "primary" : "failure"}
            id="comment"
            placeholder="Describe your listing..."
            required={true}
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {descriptionError !== "" && (
            <p className="text-sm text-red-500">{descriptionError}</p>
          )}
        </div>

        <div>
          <div className="mb-1 block">
            <Label htmlFor="small" value="Price per Month" />
          </div>
          <TextInput
            id="number"
            color={pricePerMonthError === "" ? "primary" : "failure"}
            type="number"
            addon="CHF"
            required={true}
            className="text-sm"
            value={pricePerMonth}
            onChange={(e) => {
              setPricePerMonth(e.target.value);
            }}
          />
          {pricePerMonthError !== "" && (
            <p className="text-sm text-red-500">{pricePerMonthError}</p>
          )}
        </div>

        <div>
          <div className="mb-1 block">
            <Label htmlFor="small" value="Address" />
          </div>
          <EditableAddress
            value={googleMapsData.address}
            onChange={(e) => {
              setGoogleMapsData(e);
            }}
            color={googleMapsDataError === "" ? "primary" : "failure"}
          />
          {googleMapsDataError !== "" && (
            <p className="text-sm text-red-500">{googleMapsDataError}</p>
          )}
        </div>

        <div>
          <div className="mb-1 block">
            <Label
              htmlFor="small"
              value="The Flatmate we search for:"
              className="text-sm"
            />
          </div>
          <Textarea
            className="text-sm"
            color={
              perfectFlatmateDescriptionError === "" ? "primary" : "failure"
            }
            id="comment"
            placeholder="Leave a comment..."
            required={true}
            rows={4}
            value={perfectFlatmateDescription}
            onChange={(e) => {
              setPerfectFlatmateDescription(e.target.value);
            }}
          />
          {perfectFlatmateDescriptionError !== "" && (
            <p className="text-sm text-red-500">
              {perfectFlatmateDescriptionError}
            </p>
          )}
        </div>

        <div>
          <EditableCheckbox
            label={"pets allowed"}
            content={true}
            canEdit={true}
            onChange={setPetsAllowed}
          />
          <EditableCheckbox
            label={"elevator"}
            content={true}
            canEdit={true}
            onChange={setElevator}
          />
          <EditableCheckbox
            label={"dishwasher"}
            content={true}
            canEdit={true}
            onChange={setDishwasher}
          />
        </div>

        <div>
          <ImageUploader onChange={setImages} />
          {imagesError !== "" && (
            <p className="text-sm text-red-500">{imagesError}</p>
          )}
        </div>

        <div className="flex flex-row gap-3 pt-2">
          <Button
            className="bg-secondary hover:bg-primary"
            type="submit"
            onClick={() => saveListing()}
          >
            Create Listing
          </Button>

          <button
            onClick={() => (window.location.href = "/")}
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-red-700 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
