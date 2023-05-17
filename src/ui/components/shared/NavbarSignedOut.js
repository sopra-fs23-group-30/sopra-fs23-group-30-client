import { Navbar } from "flowbite-react";
import React from "react";

function NavbarSignedOut() {
  return (
    <div className="bg-white w-full">
      <Navbar fluid={true} rounded={true} className="md:mx-48">
        <Navbar.Brand href="/">
          <img
            src="https://imgtr.ee/images/2023/05/17/vh2Qx.png"
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
    </div>
  );
}
export default NavbarSignedOut;
