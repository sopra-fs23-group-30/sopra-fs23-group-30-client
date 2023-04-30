import { decodeToken } from "react-jwt";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarSignedIn from "ui/components/shared/NavbarSignedIn";
import NavbarSignedOut from "ui/components/shared/NavbarSignedOut";
import MyApplications from "ui/views/Application/MyApplications";
import SignIn from "ui/views/Authentication/SignIn";
import SignUp from "ui/views/Authentication/SignUp";
import Inventory from "ui/views/Inventory";
import CreateListing from "ui/views/Listing/CreateListing";
import ListingDetail from "ui/views/Listing/ListingDetail";
import MyListings from "ui/views/Listing/MyListings";
import Search from "ui/views/Listing/Search";
import NotFound from "ui/views/NotFound";
import Profile from "ui/views/Profile/Profile";

const AppRouter = () => {
  let token = localStorage.getItem("authtoken");
  let isSearcher = false;
  if (token) {
    isSearcher = decodeToken(token).isSearcher;
  }

  if (!token) {
    return (
      <div className="wrapper">
        <NavbarSignedOut />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} exact />
            <Route path="/signin" element={<SignIn />} exact />
            <Route path="/signup" element={<SignUp />} exact />
            <Route path="*" element={<NotFound />} exact />
            <Route path="/inventory/:id" element={<Inventory />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  if (token && isSearcher) {
    return (
      <div className="wrapper">
        <NavbarSignedIn />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} exact />
            <Route path="/search" element={<Search />} exact />
            <Route path="/profile/:id" element={<Profile />} exact />
            <Route path="/listings/:id" element={<ListingDetail />} exact />
            <Route path="/applications" element={<MyApplications />} exact />
            <Route path="/inventory/:id" element={<Inventory />} exact />
            <Route path="*" element={<NotFound />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div>
        <NavbarSignedIn />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MyListings />} exact />
            <Route path="/profile/:id" element={<Profile />} exact />
            <Route path="/listings/:id" element={<ListingDetail />} exact />
            <Route path="/listings" element={<MyListings />} exact />
            <Route path="/createlisting" element={<CreateListing />} exact />
            <Route path="/inventory/:id" element={<Inventory />} exact />
            <Route path="*" element={<NotFound />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

export default AppRouter;
