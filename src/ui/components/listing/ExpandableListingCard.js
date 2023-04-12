import { Card } from "flowbite-react";
import { useState } from "react";
import Divider from "../general/Divider";

function ExpandableListingCard(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="divide-y">
      <div className="flex flex-row justify-between">
        <p className="text-sm font-bold">{props.listing.listingTitle}</p>
        <div className="flex flex-row gap-3">
          <button
            type="button"
            class=" font-bold text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1 focus:outline-none dark:focus:ring-blue-800"
          >
            Edit
          </button>
          <button
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
          {props.listing?.applicants?.map((applicant) => (
            <div className="flex flex-col">
              <div className="flex flex-row w-full justify-between">
                <div class="flex flex-row w-2/5 grid-cols-3 my-3 content-center">
                  <div className="w-1/3">
                    <img
                      class="w-10 h-10 rounded-full"
                      src="https://img.freepik.com/free-photo/portrait-african-american-man_23-2149072214.jpg"
                      alt="Rounded avatar"
                    />
                  </div>
                  <p className="text-sm my-3 w-1/3">{applicant.firstname}</p>
                  <p className="text-sm my-3 w-1/3">{applicant.lastname}</p>
                </div>

                <div className="flex flex-row gap-3 my-3 content-center">
                  <a
                    href={"/profile/" + applicant.applicantId}
                    class="h-6 text-center text-secondary bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-3 my-3 hover:underline focus:outline-none dark:focus:ring-blue-800"
                  >
                    See Profile
                  </a>

                  <button
                    type="button"
                    class="h-6 text-center text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-3 my-2 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Actions
                  </button>

                  <svg
                    data-accordion-icon="true"
                    class="w-6 h-6 shrink-0 collapse"
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
                </div>
              </div>
              <hr className="w-full h-0.5 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default ExpandableListingCard;
