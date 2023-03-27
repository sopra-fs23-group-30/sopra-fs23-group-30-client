import { Avatar, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Navbar } from "flowbite-react";

const handleLogout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  window.location.href = "/signin";
};

function NavbarSignedIn() {
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
    }
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
          upsearch.
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className="flex items-center space-x-4">
          <Dropdown
            label={
              <div className="flex flex-row">
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
                <div className="hidden md:block font-medium ml-3">
                  <div className="text-left">
                    {firstname} {lastname}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {email}
                  </div>
                </div>
              </div>
            }
            arrowIcon={false}
            inline={true}
          >
            <Dropdown.Header className="block md:hidden md:w-48">
              <span className="block text-sm">
                {firstname} {lastname}
              </span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <a href="/profile">Application Profile</a>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Toggle className="ml-3" />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="font-bold text-sm" href="/">
          Search
        </Navbar.Link>
        <Navbar.Link className="text-sm" href="/navbars">
          Applications
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarSignedIn;
