import { Avatar, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Navbar } from "flowbite-react";
import jwt_decode from "jwt-decode";

const handleLogout = () => {
  localStorage.removeItem("authtoken");
  window.location.href = "/signin";
};

function NavbarSignedIn() {
  const [isSearcher, setIsSearcher] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    const claims = jwt_decode(token);
    setIsSearcher(claims.isSearcher);
  }, []);

  return (
    <Navbar fluid={true} rounded={true} className="px-4 md:mx-48">
      <Navbar.Brand href="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Upsearch Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          upsearch
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className="flex items-center space-x-4">
          <Dropdown
            label={
              <div className="flex flex-row">
                <Avatar
                  alt="User settings"
                  img="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                  rounded={true}
                />
              </div>
            }
            arrowIcon={false}
            inline={true}
          >
            <Dropdown.Item onClick={handleLogout} className="text-red-500">
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Toggle className="ml-3" />
      </div>
      <Navbar.Collapse>
        {isSearcher ? (
          <>
            <Navbar.Link className="font-bold text-sm" href="/search">
              Search
            </Navbar.Link>
            <Navbar.Link className="text-sm" href="/applications">
              My Applications
            </Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Link className="font-bold text-sm" href="/listings">
              Create Listing
            </Navbar.Link>
            <Navbar.Link className="text-sm" href="/listings">
              My Listings
            </Navbar.Link>
          </>
        )}
        <Navbar.Link className="text-sm" href="/profile">
          My Profile
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarSignedIn;
