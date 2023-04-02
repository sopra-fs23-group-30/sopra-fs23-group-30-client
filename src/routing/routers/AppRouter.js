import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarSignedIn from "ui/components/shared/NavbarSignedIn";
import NavbarSignedOut from "ui/components/shared/NavbarSignedOut";
import SignIn from "ui/views/Authentication/SignIn";
import SignUp from "ui/views/Authentication/SignUp";
import Search from "ui/views/Listing/Search";
import NotFound from "ui/views/NotFound";
import ProfilePage from "ui/views/Profile/ProfilePage";
import ProfilePageEditable from "ui/views/ProfilePageEditable";

const AppRouter = () => {
  let isLoggedIn = localStorage.getItem("authtoken");

  if (!isLoggedIn) {
    return (
      <div className="wrapper">
        <NavbarSignedOut />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} exact />
            <Route path="/signin" element={<SignIn />} exact />
            <Route path="/signup" element={<SignUp />} exact />
            <Route path="profilepage" element={<ProfilePage />} />
            <Route
              path="profilepageeditable"
              element={<ProfilePageEditable />}
            />
            <Route path="*" element={<NotFound />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div>
      <NavbarSignedIn />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
