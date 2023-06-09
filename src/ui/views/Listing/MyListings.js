import { Button } from "flowbite-react";
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
    <div className="py-2.5 sm:px-4 rounded px-4 md:mx-48 flex flex-col">
      <nav className="flex " aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center pl-3">
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
          </li>
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              My Listings
            </a>
          </li>
        </ol>
      </nav>
      <h1 className="mt-3 font-bold">My Listings</h1>
      <div className="flex flex-row justify-end">
        <Button
          href="/createlisting"
          size="small"
          color="dark"
          className="text-sm p-2 bg-secondary"
        >
          Create Listing
        </Button>
      </div>

      <h1 className="text-sm pl-6 mb-1">Title</h1>
      <div className="flex flex-col gap-4">
        {listings?.map((listing) => (
          <ExpandableListingCard
            listing={listing}
            onUpdate={loadListings}
            key={listing.id}
          />
        ))}
      </div>
    </div>
  );
}
