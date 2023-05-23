import { LockClosedIcon } from "@heroicons/react/20/solid";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { api } from "helpers/api";
import { useState } from "react";
import Button from "ui/components/general/Button";
import Container from "ui/components/general/Container";
import IconTextInput from "ui/components/general/IconTextInput";
import Label from "ui/components/general/Label";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e) => {
    if (validate()) {
      setErrorMsg("");
      setEmailError("");
      setPasswordError("");
      setIsSigningIn(true);
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ` },
      };
      const requestBody = JSON.stringify({ email, password });
      let response = await api
        .post("/login", requestBody, config)
        .catch(function (error) {
          setErrorMsg("E-Mail and/or password is incorrect");
          setIsSigningIn(false);
        });
      localStorage.setItem("authtoken", response.data.token);
      window.location.href = "/";
    } else {
      e.preventDefault();
    }
  };

  const validate = () => {
    if (!email) {
      setEmailError("Please enter your email");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Please enter your password");
    } else {
      setPasswordError("");
    }
    if (email && password) {
      return true;
    }
    return false;
  };

  return (
    <div className="h-screen md:flex">
      <Container>
        <form noValidate className="bg-white w-3/4" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1 font-poppins">
            Hello Again!
          </h1>
          <p className="text-sm text-gray-600 mb-5">Welcome Back</p>
          <div className="mb-4">
            <Label value="Your Email:" />
            <IconTextInput
              colorscheme={emailError === "" ? "primary" : "failure"}
              placeholder={"hans.muster@gmail.com"}
              type={"email"}
              icon={AtSymbolIcon}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError !== "" && (
              <p className="text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <div className="mb-6">
            <Label value="Your Password:" />
            <IconTextInput
              colorscheme={passwordError === "" ? "primary" : "failure"}
              className="mb-3"
              placeholder={"********"}
              type={"password"}
              icon={LockClosedIcon}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError !== "" && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          {emailError === "" && passwordError === "" && (
            <p className="text-sm text-red-500">{errorMsg}</p>
          )}
          <Button
            type="submit"
            width="w-max"
            isloading={0}
            text={isSigningIn ? "Signing in" : "Sign in"}
          />
          <span className="text-sm">
            Don't have an account yet?
            <span className="text-blue-500 cursor-pointer ml-2">
              <a href="/signup">Sign Up </a>
            </span>
          </span>
        </form>
      </Container>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-primary to-secondary i justify-around items-center hidden">
        <div className="p-5">
          <h1 className="text-white font-bold text-4xl">
            One Click - One Apply
          </h1>
          <p className="text-white mt-1 font-poppins">
            The most popular platform for finding your perfect flatmate
          </p>
          <a
            type="submit"
            href="/howitworks"
            className="px-3 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 items-center"
          >
            Read More
          </a>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
    </div>
  );
};

export default Login;
