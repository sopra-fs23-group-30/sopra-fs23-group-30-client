import { api } from "helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { format } from 'date-fns'
import { Badge } from "flowbite-react";
import DecisionConfirmationInquiry from "ui/components/shared/DecisionConfirmationInquiry";


export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [showInquiry, setShowInquiry] = useState(true);

  useEffect(() => {
    loadApplications().catch(console.error);
  }, []);

  const loadApplications = async () => {
    let token = localStorage.getItem("authtoken");
    const decoded = decodeToken(token);
    const userId = decoded.userId;

    let response = await api.get("/profiles/" + userId + "/applications");

    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    setApplications(response.data);
    console.log(response.data);
  };

  const getStateBadge = (state) => {
    return (<Badge
      color="success"
      size="sm"
    >
      {state}
    </Badge>)
  }

  const applicationItem = (application) => {
    return (
      <div class="rounded-lg overflow-hidden shadow-lg bg-white mb-4">
        <DecisionConfirmationInquiry
          show={showInquiry}
          title="Do you really want to take back the application?"
          content="This will be permanent."
          onClick={() => {}}
          onClose={() => {setShowInquiry(false)}}
        />
        <div class="flex flex-row items-center justify-between p-4">
          <div> 
            <p class="text-sm">{format(new Date(application.creationDate), 'dd.mm.yyyy')}</p>
            <div class="flex flex-row gap-4">
              <p class="font-bold text-secondary">{application.listingTitle}</p>
              <p class="font-bold">|</p>
              <p class="text-gray-500">{application.listingStreetName} {application.listingStreetNumber}, {application.listingZipCode} {application.listingCityName}</p>
            </div>
          </div>
          {getStateBadge(application.state)}
          <div class="flex flex-row items-center gap-4">
            <a onClick={() => {setShowInquiry(true)}} class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-red-700 focus:outline-none">take back</a>
            <a href="#" class="text-sm text-primary hover:underline">See Listing</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-2 py-2.5 sm:px-4 rounded px-4 md:mx-48">
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
                href="/applications"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                My Applications
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <h1 class="mt-4 mb-4 font-bold">My Applications</h1>
      <div class="mb-20 ml-6">
        <h2 class="font-bold mb-4">Pending</h2>
          {applications.filter((application) => (application.state == "PENDING")).map((application) => applicationItem(application))}
      </div>
      <div class="mt-20 ml-6">
        <h2 class="font-bold mb-4">Accepted</h2>

      </div>
      <div class="mt-20 ml-6">
        <h2 class="font-bold mb-4">Rejected</h2>
      </div>
    </div>
  );
}
