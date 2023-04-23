import { Avatar, Dropdown, Navbar } from "flowbite-react";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const handleLogout = () => {
  localStorage.removeItem("authtoken");
  window.location.href = "/signin";
};

function NavbarSignedIn() {
  const [isSearcher, setIsSearcher] = useState();
  const [profilePictureURL, setProfilePictureURL] = useState();
  const [firstname, setFirstname] = useState();
  const [goToProfileLink, setGoToProfileLink] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    const claims = jwt_decode(token);
    setIsSearcher(claims.isSearcher);
    setGoToProfileLink("/profile/" + claims.userId);
    setProfilePictureURL(claims.profilePictureURL)
    setFirstname(claims.firstname);
  }, []);

  const update = async () => {
    alert('im in navbar')
  };


  return (
    <div class="bg-white w-full">
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
          <div className="flex items-center">
            <Dropdown
              label={
                <div className="flex flex-row">
                  <Avatar
                    alt="User settings"
                    img={profilePictureURL}
                    rounded={true}
                    className="m-0 md:mr-4"
                  >
                    <div className="space-y-1">
                      <div className="hidden md:block text-sm text-black-500 float-left">
                        Hello, {firstname}
                      </div>
                    </div>
                  </Avatar>
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
              <Navbar.Link className="text-sm" href="/listings">
                My Listings
              </Navbar.Link>
            </>
          )}
          <Navbar.Link className="text-sm" href={goToProfileLink}>
            My Profile
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarSignedIn;
