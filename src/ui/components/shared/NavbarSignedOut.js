import { Navbar } from "flowbite-react";
import React from "react";

function NavbarSignedOut() {
  return (
    <Navbar fluid={true} rounded={true} className="md:mx-48">
      <Navbar.Brand href="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="upsearch Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          upsearch
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/signin">Sign In</Navbar.Link>
        <Navbar.Link href="/signup">Sign Up</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavbarSignedOut;
