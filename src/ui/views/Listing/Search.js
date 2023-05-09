import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Label, TextInput } from "flowbite-react";
import { api } from "helpers/api";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { decodeToken } from "react-jwt";

const sortOptions = [
  {
    name: "Price: Low to High",
    value: "PRICE_ASCENDING",
    href: "#",
    current: false,
  },
  {
    name: "Price: High to Low",
    value: "PRICE_DESCENDING",
    href: "#",
    current: false,
  },
  { name: "Newest", value: "NEWEST", href: "#", current: false },
];
const filters = [
  {
    id: "properties",
    name: "Properties",
    options: [
      { value: "dishwasher", label: "dishwasher", checked: false },
      { value: "elevator", label: "elevator", checked: false },
      { value: "petsAllowed", label: "pets allowed", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Search() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [maxRentPerMonth, setMaxRentPerMonth] = useState(1000);
  const [flatmateCapacity, setFlatmateCapacity] = useState(3);
  const [listings, setListings] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  // const filteredListings = listings.filter((listing) => {
  //   return listing.title.toLowerCase().includes(searchText);
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     loadListings().catch(console.error);
  //   };
  //   fetchData();
  // }, [loadListings]);

  const loadListings = async () => {
    const listingFilterGetDTO = {
      searchText: searchText,
      maxRentPerMonth: maxRentPerMonth,
      flatmateCapacity: flatmateCapacity,
      sortBy: sortBy.value,
    };

    filters[0].options.map((option) => ( listingFilterGetDTO[option.value] = option.checked))

    let response = await api.get("/listings", {
      params: listingFilterGetDTO,
    });

    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    setListings(response.data);
  };

  const handleApply = async (listingId) => {
    let token = localStorage.getItem("authtoken");
    const decoded = decodeToken(token);
    const userId = decoded.userId;

    let body = {
      listingId: listingId,
      applicantId: userId,
    };

    try {
      let response = await api.post("/applications", body);
      if (response.status === 201) {
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

  const imageGrid = () => {
    return (
      <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4">
        <img
          src="https://flatfox.ch/media/ff/2023/04/ir5yyrqtqotgpgm6jdveamn79gckqd6v7ntvseub8119i18bo6.jpg"
          alt="test"
          className="w-full h-full col-span-2 row-span-2 rounded shadow-sm"
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

  const listingItem = (listing) => {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-6 rounded-lg p-4 mt-4 bg-white">
        <div
          className="col-span-3 xl:col-span-3 text-white rounded flex items-center justify-center"
          style={{ minHeight: "200px" }}
        >
          {imageGrid()}
        </div>
        <div className="col-span-2 xl:col-span-2 grid grid-rows-1 lg:grid-cols-2 my-2">
          <div className="col-span-1 flex flex-col justify-center mb-4 lg:mb-0">
            <p className="font-bold text-lg text-secondary">{listing.title}</p>
            <p className="font-extralight text-sm text-gray-900">
              {listing.address}
            </p>
            <p className="font-bold text-lg mt-4">
              {listing.pricePerMonth} CHF / month
            </p>
          </div>
          <div className="col-span-1 flex flex-col justify-center justify-items-center lg:justify-items-start gap-2 xl:gap-4">
            <button
              onClick={() => {
                handleApply(listing.id);
              }}
              className="text-white text-center focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Apply
            </button>
            <a
              href={"/listings/" + listing.id}
              className="text-sm text-primary text-center items-center hover:underline"
            >
              Details
            </a>
          </div>
        </div>
      </div>
    );
  };

  const handleFilterChange = (optionIdx, checked) => {
    const updatedFilters = [...filters]; // make a copy of filters array
    updatedFilters[0].options[optionIdx].checked = checked;
  };

  return (
    <div className="py-2.5  sm:px-4 rounded px-4 md:mx-48">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul className="px-2 py-3 font-medium text-gray-900">
                      <label
                        htmlFor="default-range"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Maximum rent per month: {maxRentPerMonth} CHF
                      </label>
                      <input
                        id="default-range"
                        type="range"
                        min="0"
                        max="3000"
                        value={maxRentPerMonth}
                        onChange={({ target: { value: radius } }) => {
                          setMaxRentPerMonth(radius);
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          optionIdx,
                                          e.target.checked
                                        )
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mt-8 mx-auto max-w-7xl px-4 md:lg:mt-24">
          <div className="w-full flex flex-col md:lg:flex-row justify-between">
            <div className="w-full md:lg:mr-6">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 d"
                  placeholder="Search Rooms, Places, ..."
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    loadListings();
                  }}
                  className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end order-first mx-3 mb-3 md:lg:order-last">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group flex flex-col items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <div className="inline-flex justify-center">
                      Sort By
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="w-20">{sortBy.name}</div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              onClick={() => {
                                setSortBy(option);
                                loadListings();
                              }}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <div className="bg-white rounded-lg p-4 h-min sticky top-4">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="space-y-4 pb-6 text-sm font-medium text-gray-900">
                    <label
                      htmlFor="default-range"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Maximum rent per month: {maxRentPerMonth} CHF
                    </label>
                    <input
                      id="default-range"
                      type="range"
                      min="0"
                      max="3000"
                      value={maxRentPerMonth}
                      onChange={({ target: { value: radius } }) => {
                        setMaxRentPerMonth(radius);
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </ul>

                  <ul>
                    <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="email1"
                          value="Maximum number of roommates"
                        />
                      </div>
                      <TextInput
                        type="number"
                        value={flatmateCapacity}
                        onChange={({ target: { value: nmb } }) => {
                          setFlatmateCapacity(nmb);
                        }}
                        required={true}
                      />
                    </div>
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilterChange(
                                        optionIdx,
                                        e.target.checked
                                      )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </form>
              {/* Listings grid */}
              <div className="lg:col-span-3">
                <div className="h-96 lg:h-full">
                  <p class="text-sm text-gray-500">{listings.length} results</p>
                  {listings.map((listing) => listingItem(listing))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
