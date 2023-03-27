import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "components/views/Authentication/SignIn";
import SignUp from "components/views/Authentication/SignUp";
import LoggedOutHeader from "components/views/LoggedOutHeader";

const AppRouter = () => {
  return (
    <div>
      <LoggedOutHeader />
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
