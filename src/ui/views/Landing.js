import React from 'react';
import { api } from "helpers/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import EditableImageDisplay from "ui/components/general/EditableImageDisplay";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";


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


const Landing = () => {
  
  const [maxRentPerMonth] = useState(1000);
  const [listings, setListings] = useState([]);
  const [searchText] = useState("");
  const [sortBy] = useState(sortOptions[0]);
  const [currentListings, setCurrentListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadListings = useCallback(async () => {
    const listingFilterGetDTO = {
      searchText: searchText,
      maxRentPerMonth: maxRentPerMonth,
      sortBy: sortBy.value,
    };

    filters[0].options.map(
      (option) => (listingFilterGetDTO[option.value] = option.checked)
    );

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
  }, [searchText, maxRentPerMonth, sortBy]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setCurrentListings(listings.slice(currentIndex, currentIndex + 4));
  }, [listings, currentIndex]);

  const listingItem = (listing) => {
    return (
      <Link to={`/signup`}>
        <div className='rounded-lg p-4 mt-4 bg-white'>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="col-span-3 xl:col-span-3 text-white rounded flex items-center justify-center"
            style={{ minHeight: "200px" }}
          >
            <EditableImageDisplay
              images={JSON.parse(listing.imagesJson)}
              canEdit={false}
              handleAddImage={() => {}}
              handleDeleteImage={() => {}}
            />
          </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className=" flex flex-col justify-center mb-4 lg:mb-0">
              <p className="font-bold text-xl text-secondary">
                {listing.title}
              </p>
              <p className="font-extralight text-sm text-gray-900">
                {listing.address}
              </p>
              <p className="font-bold text-lg mt-2">
                {listing.pricePerMonth} CHF / month
              </p>
            </div>
          </div>
          </div>
      </Link>
    );
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      scroll.scrollTo(howItWorksSection.offsetTop, {
        duration: 500,
        smooth: true,
        offset: -80,
      });
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      scroll.scrollTo(featuresSection.offsetTop, {
        duration: 500,
        smooth: true,
        offset: -80, 
      });
    }
  };
  
  

  return (
    <div>
    <section class="pt-18 md:mt-0 md:h-screen flex flex-col md:text-left md:flex-row md:items-center lg:px-48 md:px-12 px-4 bg-white">
    <div class="md:flex-1 md:mr-10">
      <h1 class="text-4xl font-bold mb-5 text-secondary">
        One Click – One Apply
      </h1>
      <p class="font-normal text-primary">
        The most popular platform for finding your perfect flatmate by simplifying the application process for all
      </p>
      <p class="font-normal mb-7 text-primary">
        Welcome to Upsearch, where finding and listing apartments has never been easier.
        Our platform simplifies the entire process, allowing you to effortlessly search for your dream apartment or conveniently 
        list your own. Say goodbye to writing or multiple applications, as our streamlined system enables you to apply or with 
        just one profile and a single click. Discover your perfect home or flatmate today!
      </p>
      <div class="">
      <button class="bg-secondary px-6 py-3 border-2 border-secondary rounded-lg text-white mr-2 mb-2">
        <ScrollLink
          to="how-it-works"
          smooth={true}
          duration={500}
          onClick={scrollToHowItWorks}
        >
          How it works
        </ScrollLink>
      </button>
      <button class="px-6 py-3 border-2 border-primary border-solid rounded-lg text-secondary">
      <ScrollLink
          to="features"
          smooth={true}
          duration={500}
          onClick={scrollToFeatures}
        >
          Features
        </ScrollLink>
        </button>
      </div>
    </div>
    <div class="flex md:block mt-8 md:mt-0 md:flex-1 justify-center justify-between text-center">
      <div>
      <img
  src="https://imgtr.ee/images/2023/05/17/vh2Qx.png"
  className="w-30 h-30 justify-center justify-between items-center hidden md:flex"
  alt="upsearch Logo"
/>

    </div>
    </div>
  </section>

  <section id="how-it-works" class="sectionSize justify-center justify-between items-center text-center pt-10">
    <div>
      <h2 class="text-secondary font-bold bg-underline2 text-3xl pb-10 ">How it works</h2>
    </div>
    <div class="flex flex-col md:flex-row gap-5 ">
      <div class="flex-1 mx-8 flex flex-col items-center my-4">
        <div class="border-2 border-primary rounded font-bold text-secondary h-12 w-12 flex justify-center items-center mb-3">
          1
        </div>
        <h3 class="text-xl mb-2 text-secondary font-bold">Set up Profile</h3>
        <p class="">
          Create your Profile to give a first impression of your personality.
          Add a profile pic, describe yourself and upload documents.
        </p>
      </div>
      <div class="flex-1 mx-8 flex flex-col items-center my-4">
        <div class="border-2 rounded border-primary text-secondary font-bold h-12 w-12 flex justify-center items-center mb-3">
          2
        </div>
        <h3 class="font-bold text-xl mb-2 text-secondary">Search and Apply</h3>
        <p class="text-center">
          Search for your perfect appartment and apply with a click.
        </p>
        <p class="text-center text-secondary">
          One Click – One Apply
        </p>
      </div>
      <div class="flex-1 mx-8 flex flex-col items-center my-4">
        <div class="border-2 rounded border-primary text-secondary font-bold h-12 w-12 flex justify-center items-center mb-3">
          3
        </div>
        <h3 class="font-bold text-xl mb-2 text-secondary">Move in to your new home</h3>
        <p class="text-center">
          Found your new flat? Move in and have fun with your new flatmates.
        </p>
      </div>
    </div>
  </section>
  <hr className="w-96 h-0.5 mx-auto my-4 bg-secondary border-0 rounded md:my-10 dark:bg-gray-700" />
  
  <section id="features" class="h-screen lg:px-40 sm:px-10 pt-2 mb-10">
    <h2 class="text-secondary font-bold bg-underline2 text-3xl pb-5 justify-center justify-between text-center">Have a look!</h2>
    <div className="md:grid">
      <div className="h-96 lg:h-full flex flex-wrap">
        {currentListings.map((listing) => (
          <div key={listing.id} className="w-full sm:w-1/2 lg:w-1/2 p-2">
            {listingItem(listing)}
          </div>
        ))}
      </div>
    </div>


  </section>

  </div>
  
  
  )
}

export default Landing