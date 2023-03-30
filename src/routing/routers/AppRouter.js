import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarSignedOut from "ui/components/shared/NavbarSignedOut";
import SignIn from "ui/views/Authentication/SignIn";
import SignUp from "ui/views/Authentication/SignUp";

const AppRouter = () => {
  return (
    <div>
      <NavbarSignedOut />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
