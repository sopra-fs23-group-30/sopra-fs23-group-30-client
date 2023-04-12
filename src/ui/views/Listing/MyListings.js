import { api } from "helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import ExpandableListingCard from "ui/components/listing/ExpandableListingCard";

export default function MyListings() {
  const [listings, setListings] = useState(null);

  useEffect(() => {
    loadListings().catch(console.error);
  }, []);

  const loadListings = async () => {
    let token = localStorage.getItem("authtoken");
    const decoded = decodeToken(token);
    const userId = decoded.userId;

    let response = await api.get("/profiles/" + userId + "/listings");

    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    setListings(response.data);
  };

  return (
    <div className="px-2 py-2.5 sm:px-4 rounded px-4 md:mx-48 flex flex-col gap-4">
      <nav className="flex mt-6" aria-label="Breadcrumb">
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
                href="/listings"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                My Listings
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4">
        {listings?.map((listing) => (
          <ExpandableListingCard listing={listing} />
        ))}
      </div>
    </div>
  );
}
