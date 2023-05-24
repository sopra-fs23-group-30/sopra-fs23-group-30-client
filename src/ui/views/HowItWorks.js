import { useState } from "react";

export default function HowItWorks() {
  const [searcherSideView, setIsSearcherSideView] = useState(true);

  const selectionView = () => {
    return (
      <div
        className="grid w-6/12 grid-cols-2 space-x-2 rounded-xl bg-gray-200 p-2 mt-4"
        x-data="app"
      >
        <div>
          <input
            type="radio"
            name="option"
            id="1"
            className="peer hidden"
            checked={searcherSideView}
            onClick={() => setIsSearcherSideView(true)}
            onChange={() => {}}
          />
          <label
            htmlFor="1"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white"
          >
            Searcher Side
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="2"
            className="peer hidden"
            onClick={() => setIsSearcherSideView(false)}
          />
          <label
            htmlFor="2"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white"
          >
            Lister Side
          </label>
        </div>
      </div>
    );
  };

  const searchersProcess = () => {
    return (
      <section
        id="how-it-works"
        className="sectionSize justify-center justify-between items-center text-center pt-10"
      >
        <div className="flex flex-col md:flex-row gap-5 ">
          <div className="flex-1 mx-8 flex flex-col items-center my-4">
            <div className="border-2 border-primary rounded font-bold text-secondary h-12 w-12 flex justify-center items-center mb-3">
              1
            </div>
            <h3 className="text-xl mb-2 text-secondary font-bold">
              Set up Profile
            </h3>
            <p className="">
              Create your Profile to give a first impression of your
              personality. Add a profile pic, describe yourself and upload
              documents.
            </p>
          </div>
          <div className="flex-1 mx-8 flex flex-col items-center my-4">
            <div className="border-2 rounded border-primary text-secondary font-bold h-12 w-12 flex justify-center items-center mb-3">
              2
            </div>
            <h3 className="font-bold text-xl mb-2 text-secondary">
              Search and Apply
            </h3>
            <p className="text-center">
              Search for your perfect appartment and apply with a click.
            </p>
            <p className="text-center text-secondary">One Click – One Apply</p>
          </div>
          <div className="flex-1 mx-8 flex flex-col items-center my-4">
            <div className="border-2 rounded border-primary text-secondary font-bold h-12 w-12 flex justify-center items-center mb-3">
              3
            </div>
            <h3 className="font-bold text-xl mb-2 text-secondary">
              Move in to your new home
            </h3>
            <p className="text-center">
              Found your new flat? Move in and have fun with your new flatmates.
            </p>
          </div>
        </div>
      </section>
    );
  };

  const listersProcess = () => {
    return (
      <section
        id="how-it-works"
        class="sectionSize justify-center justify-between items-center text-center pt-10"
      >
        <div class="flex flex-col md:flex-row gap-5 ">
          <div class="flex-1 mx-8 flex flex-col items-center my-4">
            <div class="border-2 border-primary rounded font-bold text-secondary h-12 w-12 flex justify-center items-center mb-3">
              1
            </div>
            <h3 class="text-xl mb-2 text-secondary font-bold">
              Set up Profile
            </h3>
            <p class="">
              Create your Profile to give a first impression of your
              personality. Add a profile pic, describe yourself and upload
              documents.
            </p>
          </div>
          <div class="flex-1 mx-8 flex flex-col items-center my-4">
            <div class="border-2 rounded border-primary text-secondary font-bold h-12 w-12 flex justify-center items-center mb-3">
              2
            </div>
            <h3 class="font-bold text-xl mb-2 text-secondary">
              Create a listing
            </h3>
            <p class="text-center">
              List you apartment. Add photos, a monthly rent, describe it and add its location.</p>
          </div>
          <div class="flex-1 mx-8 flex flex-col items-center my-4">
            <div class="border-2 rounded border-primary text-secondary font-bold h-12 w-12 flex justify-center items-center mb-3">
              3
            </div>
            <h3 class="font-bold text-xl mb-2 text-secondary">
              Manage Applicants
            </h3>
            <p class="text-center">
              Get notified as soon as an application comes in. Observe the
              applicants' profiles, compare them and select your perfect match. 
              <p class="text-center text-secondary">
              Have fun with your new flatmate!</p>
            </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="py-2.5 sm:px-4 rounded px-4 lg:mx-48 flex flex-col gap-0 items-center">
      <div>
        <h2 class="text-secondary font-bold bg-underline2 text-3xl py-10 ">
          How it works
        </h2>
      </div>
      {selectionView()}

      <div className="mt-8">
        {searcherSideView ? (
          <div>{searchersProcess()}</div>
        ) : (
          <div>{listersProcess()}</div>
        )}
      </div>
    </div>
  );
}
