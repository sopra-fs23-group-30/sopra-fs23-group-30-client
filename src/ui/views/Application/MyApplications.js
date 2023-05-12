import { format } from "date-fns";
import { Badge, Button, Dropdown } from "flowbite-react";
import { api } from "helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import DecisionConfirmationInquiry from "ui/components/shared/DecisionConfirmationInquiry";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [showInquiry, setShowInquiry] = useState(false);

  const hasActiveItem = applications.some((item) => item.state === "MOVEIN");

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
  };

  const action = async (applicationId, newState) => {
    let body = {
      newState: newState,
    };
    try {
      let response = await api.put("/applications/" + applicationId, body);

      if (response.status === 204) {
        toast("Action successful", {
          duration: 4000,
          position: "top-right",
          icon: "✅",
        });
      }
    } catch (ex) {
      toast("Action unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }

    loadApplications();
  };

  const getStateBadge = (state) => {
    if (state === "PENDING") {
      return <Badge color="dark">{state}</Badge>;
    }
    if (state === "ACCEPTED") {
      return <Badge>{state}</Badge>;
    }
    if (state === "DECLINED") {
      return <Badge color="failure">{state}</Badge>;
    }
    if (state === "MOVEIN") {
      return <Badge color="success">{state}</Badge>;
    }
  };

const applicationItem = (application) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white mb-4">
      <DecisionConfirmationInquiry
        show={showInquiry}
        title="Do you really want to take back the application?"
        content="This will be permanent."
        onClick={() => {}}
        onClose={() => {
          setShowInquiry(false);
        }}
      />
      <div className="flex flex-col sm:flex-row md:items-center md:justify-between p-4">
        <div className="flex flex-col">
          <p className="text-sm">
            {format(new Date(application.creationDate), "dd.MM.yyyy")}
          </p>
          <div className="text-sm flex flex-row gap-4">
            <p className="text-sm font-bold text-secondary">
              {application.listingTitle}
            </p>
            <p className="text-sm font-bold">|</p>
            <p className="text-sm text-gray-500">
              {application.listingAddress}{" "}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4">
        {getStateBadge(application.state)}
        {application.state === "PENDING" ? (
          <Button className="bg-secondary hover:bg-primary w-25" size="sm">
            Take Back
          </Button>
        ) : application.state === "MOVEIN" ? (
          <Button
            size="xs"
            className="bg-primary w-30"
            href={
              "/inventories/" +
              applications.find((x) => x.state === "MOVEIN").inventoryId
            }
          >
            Inventory List{" "}
          </Button>
        ) : application.state !== "DECLINED" && (
          <Dropdown
            class="text-center text-white bg-secondary hover:bg-primary focus:ring-4 focus:ring-primary-300 rounded-lg text-sm focus:outline-none dark:focus:ring-blue-800"
            label="Actions"
            dismissOnClick={false}
          >
            <Dropdown.Item
              onClick={() => action(application.applicationId, "DECLINED")}
            >
              Take Back
            </Dropdown.Item>
            {application.state === "ACCEPTED" && (
              <Dropdown.Item
                onClick={() => action(application.applicationId, "MOVEIN")}
              >
                Move-In
              </Dropdown.Item>
            )}
          </Dropdown>
        )}
          <a
            href={"/listings/" + application.listingId}
            className="text-sm text-secondary hover:underline"
          >
            See Listing
          </a>
        </div>
      </div>
    </div>
  );
};


  return (
    <div className="py-2.5 sm:px-4 rounded px-4 md:mx-48">
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

      {!hasActiveItem && (
        <div>
          <h1 class="mt-3 mb-4 font-bold">My Applications</h1>
          <div class="mb-20 ml-6">
            <h2 class="font-bold mb-4">Pending</h2>
            {applications
              .filter((application) => application.state === "PENDING")
              .map((application) => applicationItem(application))}
          </div>
          <div class="mt-20 ml-6">
            <h2 class="font-bold mb-4">Accepted</h2>
            {applications
              .filter((application) => application.state === "ACCEPTED")
              .map((application) => applicationItem(application))}
          </div>
          <div class="mt-20 ml-6">
            <h2 class="font-bold mb-4">Rejected</h2>
            {applications
              .filter((application) => application.state === "DECLINED")
              .map((application) => applicationItem(application))}
          </div>
        </div>
      )}

      {hasActiveItem && (
        <div class="mt-20 ml-6">
          <h2 class="font-bold mb-4">Your new home:</h2>
          {applications
            .filter((application) => application.state === "MOVEIN")
            .map((application) => applicationItem(application))}
        </div>
      )}
    </div>
  );
}
