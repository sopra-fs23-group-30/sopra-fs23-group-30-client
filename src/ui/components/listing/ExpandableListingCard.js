import { Badge, Card, Dropdown } from "flowbite-react";
import { api } from "helpers/api";
import { useState } from "react";
import toast from "react-hot-toast";
import DecisionConfirmationInquiry from "../shared/DecisionConfirmationInquiry";

function ExpandableListingCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);

  const takeOffline = async () => {
    setShowInquiry(true);
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
    return (
      <div>
        {state === "PENDING" && <Badge color="info">{state}</Badge>}
        {state === "ACCEPTED" && <Badge color="success">{state}</Badge>}
        {state === "DECLINED" && <Badge color="failure">{state}</Badge>}
        {state === "MOVEIN" && <Badge color="black">{state}</Badge>}
      </div>
    );
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
          <div className="flex flex-row gap-3">
            <a
              href={"/listings/" + props.listing.listingId}
              type="button"
              class=" font-bold text-secondary bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1 hover:underline focus:outline-none dark:focus:ring-blue-800"
            >
              Edit
            </a>
            <button
              onClick={() => takeOffline()}
              type="button"
              class=" font-bold text-secondary bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1 hover:underline focus:outline-none dark:focus:ring-blue-800"
            >
              Take Offline
            </button>

            {!isOpen && (
              <svg
                data-accordion-icon="true"
                class="w-6 h-6 shrink-0"
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
                class="w-6 h-6 rotate-180 shrink-0"
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
              <table class="w-full table-fixed ">
                <thead>
                  <tr>
                    <th class="w-2/6 text-left text-sm px-4">Name</th>
                    <th class="w-3/6 text-left px-4 py-2 text-sm">
                      Application Date
                    </th>
                    <th class="w-1/6"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.listing?.applicants?.length > 0 &&
                    props.listing?.applicants?.map((applicant) => (
                      <tr key={applicant.id}>
                        <td class="text-center px-4 py-2 flex flex-row items-center">
                          <div class="bg-gray-400 rounded-full w-8 h-8"></div>
                          <p className="ml-5 text-sm">
                            {applicant.firstname} {applicant.lastname}
                          </p>
                        </td>
                        <td class="px-4 py-2 text-sm">
                          {new Date(
                            applicant.applicationDate
                          ).toLocaleDateString("ch-DE")}
                        </td>
                        <td class="text-right px-4 py-2 text-sm">
                          <div class="flex justify-end items-center gap-3">
                            {applicant.state === "PENDING" && (
                              <Dropdown
                                class="text-center text-sm text-white bg-secondary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm focus:outline-none dark:focus:ring-blue-800"
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

                            {getBadge(applicant.state)}

                            <a
                              href={"/profile/" + applicant.applicantId}
                              class="text-center text-secondary bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm  hover:underline focus:outline-none dark:focus:ring-blue-800"
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
