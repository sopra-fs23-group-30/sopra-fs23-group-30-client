import { api } from "helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { useParams } from "react-router-dom";
import Map from "ui/components/listing/Map";

export default function ListingDetail() {
  const [listingData, setListingData] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

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
    setCanEdit(response.data.listerId === userId);
  };

  const imageGrid = () => {
    return (
      <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4">
        <img
          src="https://cdn.pixabay.com/photo/2018/06/23/21/00/balance-3493487__340.jpg"
          alt="test"
          className="w-full h-full col-span-2 row-span-2 rounded shadow-sm lg:col-start-3 lg:row-start-1"
        />
        <img
          className="w-full h-full"
          alt="test"
          src="https://cdn.pixabay.com/photo/2017/11/09/10/57/light-weight-aggregates-2933073__340.jpg"
        />
        <img
          className="w-full h-full"
          alt="test"
          src="https://cdn.pixabay.com/photo/2017/11/09/10/57/light-weight-aggregates-2933073__340.jpg"
        />
        <img
          className="w-full h-full"
          alt="test"
          src="https://cdn.pixabay.com/photo/2017/11/09/10/57/light-weight-aggregates-2933073__340.jpg"
        />
        <img
          className="w-full h-full"
          alt="test"
          src="https://cdn.pixabay.com/photo/2017/11/09/10/57/light-weight-aggregates-2933073__340.jpg"
        />
      </div>
    );
  };

  const titleInformationRow = () => {
    return (
      <div class="grid md:grid-cols-2 gap-4 grid-cols-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="font-extrabold text-primary text-md">
              {listingData?.title}
            </p>
            <p className="text-black text-sm">
              {listingData?.streetName} {listingData?.streetNumber},{" "}
              {listingData?.zipCode} {listingData?.cityName}
            </p>
          </div>

          <p className="font-extrabold text-primary text-md">
            {listingData?.pricePerMonth} CHF / month
          </p>
        </div>
        <div className="flex flex-row justify-end">
          {!canEdit && !hasApplied && (
            <button
              onClick={() => handleApply()}
              type="button"
              class="w-full font-bold md:w-1/4 text-white bg-secondary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none dark:focus:ring-blue-800"
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
      <div class="block w-full md:w-1/2 p-2 pt-4 pr-4 pb-4 bg-white border border-gray-200 rounded-lg shadow">
        <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          Description
        </h5>
        <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
          {listingData?.description}
        </p>
      </div>
    );
  };

  const listerSection = () => {
    return (
      <div class="relative block w-full md:w-1/2 p-2 pt-4 pr-4 pb-4 bg-white border border-gray-200 rounded-lg shadow">
        <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          About the lister
        </h5>
        <div className="flex flex-col gap-4">
          <p class="text-sm font-bold text-gray-700 dark:text-gray-400">
            {listingData?.listerFirstname} {listingData?.listerLastname} (24
            years old)
          </p>

          <p class="w-2/3 md:w-3/4 text-sm font-normal text-gray-700 dark:text-gray-400">
            "Ich bin Matthias und freue mich mega auf einen neuen Mitbewohner"
          </p>

          <a
            href={"/profile/" + listingData?.listerId}
            className="text-white text-center bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            See Profile
          </a>

          <div class="absolute top-2 right-2">
            <img
              class="object-fill w-24 h-24"
              alt="profilePicture"
              src="https://img.freepik.com/free-photo/portrait-african-american-man_23-2149072214.jpg"
            />
          </div>
        </div>
      </div>
    );
  };

  const lookingForSection = () => {
    return (
      <div class="relative block w-full md:w-1/2 p-2 pt-4 pr-4 pb-4">
        <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          What we're looking for
        </h5>
        <div className="flex flex-col gap-4">
          <p class="w-2/3 md:w-3/4 text-sm font-normal text-gray-700 dark:text-gray-400">
            {listingData?.perfectFlatmateDescription}
          </p>
        </div>
      </div>
    );
  };

  const mapsSection = () => {
    return (
      <div class=" w-full md:w-1/2 p-2 pt-4 pr-4 pb-4">
        <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
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
    <div className="px-2 py-2.5 sm:px-4 rounded px-4 md:mx-48 flex flex-col gap-4 mt-8">
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
