import React from 'react';
import { api } from "helpers/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import EditableImageDisplay from "ui/components/general/EditableImageDisplay";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Landing = () => {
    const [listings, setListings] = useState([]);
  const [currentListings, setCurrentListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadListings = useCallback(async () => {
    const config = {
      headers: { Authorization: `Bearer ` },
    };
    let response = await api.get("/listingpreviews",config);

    console.log(response)
    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    setListings(response.data);
  }, []);

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
        <div className='rounded-lg p-4 mt-4 bg-white shadow-md'>
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