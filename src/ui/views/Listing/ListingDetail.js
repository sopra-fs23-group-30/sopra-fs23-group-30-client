import { api, handleError } from "helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";
import EditableCheckbox from "ui/components/general/EditableCheckbox";
import ImageSlider from "ui/components/general/ImageSlider";
import Map from "ui/components/listing/Map";
import TransparentEditableAddress from "ui/components/listing/TransparentEditableAddress";
import TransparendEditableString from "ui/components/listing/TransparentEditableString";
import TransparentEditableTextArea from "ui/components/listing/TransparentEditableTextArea";

export default function ListingDetail() {
  const [listingData, setListingData] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    loadListing(params.id).catch(console.error);
  }, [params.id]);

  const handleApply = async () => {
    let token = localStorage.getItem("authtoken");
    const decoded = decodeToken(token);
    const userId = decoded.userId;

    let body = {
      listingId: params.id,
      applicantId: userId,
    };

    try {
      let response = await api.post("/applications", body);
      if (response.status === 201) {
        setHasApplied(true);
        toast("Application successful", {
          duration: 4000,
          position: "top-right",
          icon: "✅",
        });
        return;
      }
    } catch (ex) {
      toast(handleError(ex), {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
  };

  const handleTitleChange = (newVal) => {
    let existingData = listingData;
    existingData.title = newVal;
    setListingData(existingData);
    updateListing();
  };

  const handleAddressChange = (newVal) => {
    let existingData = listingData;
    existingData.address = newVal.address;
    existingData.lattitude = newVal.coordinates.lat;
    existingData.longitude = newVal.coordinates.lng;
    setListingData(existingData);
    updateListing();
  };

  const handlePricePerMonthChange = (newVal) => {
    let existingData = listingData;
    existingData.pricePerMonth = newVal;
    setListingData(existingData);
    updateListing();
  };

  const handleDescriptionChange = (newVal) => {
    let existingData = listingData;
    existingData.description = newVal;
    setListingData(existingData);
    updateListing();
  };

  const handleFutureFlatmateDescriptionChange = (newVal) => {
    let existingData = listingData;
    existingData.perfectFlatmateDescription = newVal;
    setListingData(existingData);
    updateListing();
  };

  const handlePetsAllowed = (newVal) => {
    let existingData = listingData;
    existingData.petsAllowed = newVal;
    setListingData(existingData);
    updateListing();
  };

  const handleElevator = (newVal) => {
    let existingData = listingData;
    existingData.elevator = newVal;
    setListingData(existingData);
    updateListing();
  };

  const handleDishwasher = (newVal) => {
    let existingData = listingData;
    existingData.dishwasher = newVal;
    setListingData(existingData);
    updateListing();
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    let tempImages = imageFiles;
    tempImages.push(file);
    setImageFiles(tempImages);
    updateListing();
  };

  const handleDeleteImage = (imageUrl) => {
    let tempImages = imageUrls.filter((image) => {
      return image.imageURL !== imageUrl;
    });
    setImageUrls(tempImages);
    updateListing();
  };

  const updateListing = async () => {
    let toUpdateObj = {
      title: listingData.title,
      description: listingData.description,
      address: listingData.address,
      lattitude: listingData.lattitude,
      longitude: listingData.longitude,
      pricePerMonth: listingData.pricePerMonth,
      perfectFlatmateDescription: listingData.perfectFlatmateDescription,
      listerId: listingData.listerId,
      imagesJson: JSON.stringify(imageUrls),
      petsAllowed: listingData.petsAllowed,
      elevator: listingData.elevator,
      dishwasher: listingData.dishwasher,
    };

    const formData = new FormData();
    formData.append("body", JSON.stringify(toUpdateObj));
    imageFiles.forEach((image) => {
      formData.append("files", image, image.name);
    });

    try {
      let response = await api.put("/listings/" + params.id, formData);
      if (response.status === 204) {
        toast("Save successful", {
          duration: 4000,
          position: "top-right",
          icon: "✅",
        });
      } else {
        toast("Save unsuccessful", {
          duration: 4000,
          position: "top-right",
          icon: "❌",
        });
      }
    } catch (ex) {
      toast("Save unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
  };

  function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const loadListing = async (listingId) => {
    let token = localStorage.getItem("authtoken");
    const decoded = decodeToken(token);
    const userId = decoded.userId;

    let response = await api.get("/listings/" + listingId);

    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    setListingData(response.data);
    setImageUrls(JSON.parse(response.data.imagesJson));
    setCanEdit(response.data.listerId === userId);
  };

  const titleInformationRow = () => {
    return (
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-1/2">
            <TransparendEditableString
              className="font-extrabold text-primary text-md bg-transparent text-left"
              content={listingData?.title}
              canEdit={canEdit}
              onSave={handleTitleChange}
              inputType="text"
              errormessage="Please enter a title"
              alignerrorright={false}
              isNumeric={false}
            />

            <TransparentEditableAddress
              className="text-black text-sm bg-transparent"
              content={{
                address: listingData?.address,
                coordinates: {
                  lat: listingData?.lattitude,
                  lng: listingData?.longitude,
                },
              }}
              canEdit={canEdit}
              onSave={handleAddressChange}
            />
          </div>

          <div className="flex flex-row font-extrabold text-primary text-md">
            <TransparendEditableString
              className="font-extrabold text-primary text-md bg-transparent mr-2 text-right"
              content={listingData?.pricePerMonth.toString()}
              canEdit={canEdit}
              onSave={handlePricePerMonthChange}
              errormessage="Please enter a price per month"
              alignerrorright={true}
              isNumeric={true}
            />
            CHF / month
          </div>
        </div>
        <div className="flex flex-row justify-end">
          {!canEdit && !hasApplied && (
            <button
              onClick={() => handleApply()}
              type="button"
              className="w-full font-bold md:w-1/4 text-white bg-secondary hover:bg-primary focus:ring-4 focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none dark:focus:ring-blue-800"
            >
              Apply
            </button>
          )}
        </div>
      </div>
    );
  };

  const descriptionSection = () => {
    return (
      <div className="block w-full lg:w-1/2 p-2 pt-1 pr-4 pb-4 bg-white border border-gray-200 rounded-lg shadow">
        <TransparentEditableTextArea
          label="Description"
          className="text-sm font-normal text-gray-700 dark:text-gray-400 bg-transparent"
          content={listingData?.description}
          canEdit={canEdit}
          onSave={handleDescriptionChange}
          isCardContent={true}
          errormessage="Please enter a description"
        />
      </div>
    );
  };

  const listerSection = () => {
    return (
      <div className="relative block w-full lg:w-1/2 p-5 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          About the lister
        </h5>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-400">
            {listingData?.listerFirstname} {listingData?.listerLastname}
            {listingData?.listerBirthdate !== null
              ? " (" +
                calculateAge(new Date(listingData?.listerBirthdate)) +
                " years old)"
              : ""}
          </p>

          <p className="w-2/3 md:w-3/4 text-sm font-normal text-gray-700 dark:text-gray-400">
            {listingData?.listerDescription}
          </p>

          <a
            href={"/profile/" + listingData?.listerId}
            className="text-white text-center focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-secondary hover:bg-primary focus:outline-none"
          >
            See Profile
          </a>

          <div className="absolute top-2 right-2">
            {listingData?.profilePictureURL && (
              <img
                src={listingData?.profilePictureURL}
                alt="face of lister / searcher"
                className="w-24 h-24 rounded object-cover"
              />
            )}

            {!listingData?.profilePictureURL && (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                className="object-fill w-24 h-24"
                alt="face of lister / searcher (unknown)"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const lookingForSection = () => {
    return (
      <div className="relative block w-full lg:w-1/2 p-2 pt-4 pr-4 pb-4">
        <div className="flex flex-col gap-4">
          <TransparentEditableTextArea
            label="What we're looking for"
            className="text-sm font-normal text-gray-700 dark:text-gray-400 bg-transparent"
            content={listingData?.perfectFlatmateDescription}
            canEdit={canEdit}
            onSave={handleFutureFlatmateDescriptionChange}
            isCardContent={false}
            errormessage="Please enter a perfect flatmate description"
          />
        </div>
      </div>
    );
  };

  const mapsSection = () => {
    return (
      <div className=" w-full lg:w-1/2 p-2 pt-4 pr-4 pb-4">
        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          Where we live
        </h5>
        <Map
          coords={{
            lat: listingData?.lattitude,
            lng: listingData?.longitude,
          }}
        />
      </div>
    );
  };

  const checkboxSection = () => {
    return (
      <div className="flex flex-col">
        <EditableCheckbox
          label={"pets allowed"}
          content={listingData?.petsAllowed}
          canEdit={canEdit}
          onChange={handlePetsAllowed}
        />
        <EditableCheckbox
          label={"elevator"}
          content={listingData?.elevator}
          canEdit={canEdit}
          onChange={handleElevator}
        />
        <EditableCheckbox
          label={"dishwasher"}
          content={listingData?.dishwasher}
          canEdit={canEdit}
          onChange={handleDishwasher}
        />
      </div>
    );
  };

  return (
    <div className="py-2.5 sm:px-4 rounded px-4 lg:mx-48 flex flex-col gap-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <div class="group">
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
                href="test"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Listing
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <ImageSlider images={imageUrls} />
      {titleInformationRow()}
      {descriptionSection()}
      {listerSection()}
      {lookingForSection()}
      {checkboxSection()}
      {mapsSection()}
    </div>
  );
}
