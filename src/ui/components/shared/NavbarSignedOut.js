import { Navbar } from "flowbite-react";
import React from "react";

function NavbarSignedOut() {
  return (
    <div className="bg-white w-full">
      <Navbar fluid={true} rounded={true} className="md:mx-48">
        <Navbar.Brand href="/">
          <img
            src="https://github.com/sopra-fs23-group-30/sopra-fs23-group-30-client/assets/91197246/f863d4aa-cb5a-4cfa-8f4f-d9d98774f8a4"
            className="mr-3 h-6 sm:h-9"
            alt="upsearch Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            upsearch
          </span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/howitworks">How It Works</Navbar.Link>
          <Navbar.Link href="/signin">Sign In</Navbar.Link>
          <Navbar.Link href="/signup">Sign Up</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default NavbarSignedOut;
