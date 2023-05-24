import { Badge, Button, Card, Dropdown } from "flowbite-react";
import { api } from "helpers/api";
import { useState } from "react";
import toast from "react-hot-toast";
import DecisionConfirmationInquiry from "../shared/DecisionConfirmationInquiry";

function ExpandableListingCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);

  const takeOffline = async (listingId) => {
    try {
      let response = await api.delete("/listings/" + listingId);

      if (response.status === 204) {
        toast("Deletion successful", {
          duration: 4000,
          position: "top-right",
          icon: "✅",
        });
        props.onUpdate();
      }
    } catch (ex) {
      toast("Deletion unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
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
        props.onUpdate();
      }
    } catch (ex) {
      toast("Action unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
  };

  const getBadge = (state) => {
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

  return (
    <div>
      <DecisionConfirmationInquiry
        show={showInquiry}
        title="Do you really want to take the listing offline?"
        content="This will be permanent."
        onClick={() => {}}
        onClose={() => {
          setShowInquiry(false);
        }}
      />
      <Card className="divide-y">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm font-bold">{props.listing.listingTitle}</p>
          <div className="flex flex-row gap-3 items-center">
            {props.listing.applicants.some(
              (applicant) => applicant.state === "MOVEIN"
            ) ? (
              <div className="flex flex-row gap-3">{getBadge("MOVEIN")}</div>
            ) : (
              <div className="flex flex-row gap-3">
                <a
                  href={"/listings/" + props.listing.listingId}
                  type="button"
                  className="text-secondary bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1 hover:underline focus:outline-none dark:focus:ring-blue-800"
                >
                  Edit
                </a>
                {!props.listing.applicants.some(
                  (applicant) => applicant.state === "MOVEIN"
                ) && (
                  <button
                    onClick={() => takeOffline(props.listing.listingId)}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 focus:outline-none"
                  >
                    Take Offline
                  </button>
                )}
              </div>
            )}

            {!isOpen && (
              <svg
                data-accordion-icon="true"
                className="w-6 h-6 shrink-0 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}

            {isOpen && (
              <svg
                data-accordion-icon="true"
                className="w-6 h-6 rotate-180 shrink-0 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="flex flex-col gap-3">
            {props.listing?.applicants?.length > 0 && (
              <table className="w-full table-fixed ">
                <thead>
                  <tr>
                    <th className="w-3/12 text-left text-sm px-4">Name</th>
                    <th className="w-6/12 text-left px-4 py-2 text-sm">
                      Application Date
                    </th>
                    <th className="w-3/12"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.listing?.applicants?.length > 0 &&
                    props.listing?.applicants?.map((applicant) => (
                      <tr key={applicant.id}>
                        <td className="text-center px-4 py-2 flex flex-row items-center">
                          {applicant?.profilePictureURL && (
                            <img
                              src={applicant?.profilePictureURL}
                              alt="face of lister / searcher"
                              className="bg-gray-400 rounded w-8 h-8 object-cover"
                            />
                          )}

                          {!applicant?.profilePictureURL && (
                            <img
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                              alt="face of lister / searcher"
                              className="bg-gray-400 rounded-full w-8 h-8 "
                            />
                          )}

                          <p className="ml-5 text-sm">
                            {applicant.firstname} {applicant.lastname}
                          </p>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {new Date(
                            applicant.applicationDate
                          ).toLocaleDateString("ch-DE")}
                        </td>
                        <td className="text-right px-4 py-2 text-sm">
                          <div className="flex justify-end items-center gap-3">
                            {getBadge(applicant.state)}
                            {applicant.state === "PENDING" && (
                              <Dropdown
                                className="text-center text-white bg-secondary hover:bg-primary focus:ring-4 focus:ring-primary-300 rounded-lg text-sm focus:outline-none dark:focus:ring-blue-800"
                                label="Actions"
                                dismissOnClick={false}
                              >
                                <Dropdown.Item
                                  onClick={() =>
                                    action(applicant.applicationId, "ACCEPTED")
                                  }
                                >
                                  Accept
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    action(applicant.applicationId, "DECLINED")
                                  }
                                >
                                  Decline
                                </Dropdown.Item>
                              </Dropdown>
                            )}

                            {applicant.state === "MOVEIN" && (
                              <Button
                                size="xs"
                                className="bg-primary "
                                href={"/inventories/" + applicant.inventoryId}
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Inventory List
                              </Button>
                            )}

                            <a
                              href={"/profile/" + applicant.applicantId}
                              class="text-center text-secondary bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm  hover:underline focus:outline-none dark:focus:ring-blue-800"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              See Profile
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {props.listing?.applicants?.length <= 0 && (
              <p className="text-sm">No applications yet</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default ExpandableListingCard;
