import { api } from "helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { useParams } from "react-router-dom";
import Map from "ui/components/listing/Map";
import TransparendEditableString from "ui/components/listing/TransparentEditableString";
import TransparentEditableTextArea from "ui/components/listing/TransparentEditableTextArea";

export default function ListingDetail() {
  const [listingData, setListingData] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

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
      toast("Application unsuccessful - you've already applied", {
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
    existingData.streetName = newVal;
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

  const updateListing = async () => {
    console.log(listingData);
    const formData = new FormData();
    formData.append("body", JSON.stringify(listingData));
    formData.append("files", []);

    try {
      let response = await api.put("/listings/" + params.id, listingData);
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
    console.log(JSON.parse(response.data.imagesJson));
    setCanEdit(response.data.listerId === userId);
  };

  const imageGrid = () => {
    return (
      <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4">
        <img
          src="https://flatfox.ch/media/ff/2023/04/ir5yyrqtqotgpgm6jdveamn79gckqd6v7ntvseub8119i18bo6.jpg"
          alt="test"
          className="w-full h-full col-span-2 row-span-2 rounded shadow-sm lg:col-start-3 lg:row-start-1"
        />
        <img
          className="w-full h-full"
          alt="test"
          src="https://flatfox.ch/media/ff/2023/04/ir5yyrqtqotgpgm6jdveamn79gckqd6v7ntvseub8119i18bo6.jpg"
        />
        <img
          className="w-full h-full"
          alt="test"
          src="https://flatfox.ch/media/ff/2023/04/9dftx6b6atv4ep0g6h7bt0qumsclfh4fgh3e6rv41dcet262a3.jpg"
        />
        <img
          className="w-full h-full"
          alt="test"
          src="https://flatfox.ch/media/ff/2023/04/aelnq8mpfp4shjsi9z6qjxm2brdopwbmci3st3n36o984yfrzj.jpg"
        />
        <img
          className="w-full h-full"
          alt="test"
          src="https://flatfox.ch/media/ff/2023/04/27mo6afz7atla00ztilasqq7uzx1dhxif49sz9oabs5zjtwyu3.jpg"
        />
      </div>
    );
  };

  const titleInformationRow = () => {
    return (
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-1/2">
            <TransparendEditableString
              className="font-extrabold text-primary text-md bg-transparent"
              content={listingData?.title}
              canEdit={canEdit}
              onSave={handleTitleChange}
              inputType="text"
            />

            <p className="text-black text-sm">
              <TransparendEditableString
                className="text-black text-sm bg-transparent"
                content={listingData?.streetName}
                canEdit={canEdit}
                onSave={handleAddressChange}
              />
            </p>
          </div>

          <div className="flex flex-row font-extrabold text-primary text-md">
            <TransparendEditableString
              className="font-extrabold text-primary text-md bg-transparent mr-2"
              content={listingData?.pricePerMonth.toString()}
              canEdit={canEdit}
              onSave={handlePricePerMonthChange}
            />
            CHF / month
          </div>
        </div>
        <div className="flex flex-row justify-end">
          {!canEdit && !hasApplied && (
            <button
              onClick={() => handleApply()}
              type="button"
              className="w-full font-bold md:w-1/4 text-white bg-secondary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none dark:focus:ring-blue-800"
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
      <div className="block w-full md:w-1/2 p-2 pt-1 pr-4 pb-4 bg-white border border-gray-200 rounded-lg shadow">
        <TransparentEditableTextArea
          label="Description"
          className="text-sm font-normal text-gray-700 dark:text-gray-400 bg-transparent"
          content={listingData?.description}
          canEdit={canEdit}
          onSave={handleDescriptionChange}
          isCardContent={true}
        />
      </div>
    );
  };

  const listerSection = () => {
    return (
      <div className="relative block w-full md:w-1/2 p-5 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          About the lister
        </h5>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-400">
            {listingData?.listerFirstname} {listingData?.listerLastname} (
            {calculateAge(new Date(listingData?.listerBirthdate))} years old)
          </p>

          <p className="w-2/3 md:w-3/4 text-sm font-normal text-gray-700 dark:text-gray-400">
            "{listingData?.listerDescription}"
          </p>

          <a
            href={"/profile/" + listingData?.listerId}
            className="text-white text-center focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            See Profile
          </a>

          <div className="absolute top-2 right-2">
            {listingData?.profilePictureURL && (
              <img
                src={listingData?.profilePictureURL}
                alt="face of lister / searcher"
                className="object-fill w-24 h-24"
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
      <div className="relative block w-full md:w-1/2 p-2 pt-4 pr-4 pb-4">
        <div className="flex flex-col gap-4">
          <TransparentEditableTextArea
            label="What we're looking for"
            className="text-sm font-normal text-gray-700 dark:text-gray-400 bg-transparent"
            content={listingData?.perfectFlatmateDescription}
            canEdit={canEdit}
            onSave={handleFutureFlatmateDescriptionChange}
            isCardContent={false}
          />
        </div>
      </div>
    );
  };

  const mapsSection = () => {
    return (
      <div className=" w-full md:w-1/2 p-2 pt-4 pr-4 pb-4">
        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          Where we live
        </h5>
        <Map
          coords={{
            lat: -3.745,
            lng: -38.523,
          }}
        />
      </div>
    );
  };

  return (
    <div className="py-2.5 sm:px-4 rounded px-4 md:mx-48 flex flex-col gap-4 mt-8">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
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
      {imageGrid()}
      {titleInformationRow()}
      {descriptionSection()}
      {listerSection()}
      {lookingForSection()}
      {mapsSection()}
    </div>
  );
}
