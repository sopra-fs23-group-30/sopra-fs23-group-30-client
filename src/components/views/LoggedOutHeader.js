import { Navbar } from "flowbite-react";
import React from "react";

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = (props) => (
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

export default Header;
