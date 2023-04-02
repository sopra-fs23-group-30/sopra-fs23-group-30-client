import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarSignedOut from "ui/components/shared/NavbarSignedOut";
import SignIn from "ui/views/Authentication/SignIn";
import SignUp from "ui/views/Authentication/SignUp";
import ProfilePage from "ui/views/ProfilePage";
import ProfilePageEditable from "ui/views/ProfilePageEditable";

const AppRouter = () => {
  return (
    <div>
      <NavbarSignedOut />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profilepage" element={<ProfilePage />} />
          <Route path="profilepageeditable" element={<ProfilePageEditable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
