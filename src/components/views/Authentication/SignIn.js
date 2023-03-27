import React, { useState } from "react";
import "styles/views/Login.scss";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import Container from "components/Components/General/Container";
import Label from "components/Components/General/Label";
import IconTextInput from "components/Components/General/IconTextInput";
import { api } from "helpers/api";
import Button from "components/Components/General/Button";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e) => {
    setIsSigningIn(true);
    e.preventDefault();
    const requestBody = JSON.stringify({ email, password });
    const response = await api.post("/users", requestBody);
    if (response.status === 200) {
      //user login success -> set cookie + navigate to home
    } else {
      setErrorMsg("Login failed, please try again");
    }
    setIsSigningIn(false);
  };

  return (
    <div className="h-screen md:flex">
      <Container>
        <form className="bg-white w-3/4" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1 font-poppins">
            Hello Again!
          </h1>
          <p className="text-sm text-gray-600 mb-5">Welcome Back</p>
          <div className="mb-4">
            <Label value="Your Email:" />
            <IconTextInput
              placeholder={"hans.muster@gmail.com"}
              required={true}
              type={"email"}
              icon={AtSymbolIcon}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <Label value="Your Password:" />
            <IconTextInput
              className="mb-3"
              placeholder={"********"}
              required={true}
              type={"password"}
              icon={LockClosedIcon}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="text-sm text-red-500">{errorMsg}</p>
          <Button
            type="submit"
            width="w-max"
            isloading={0}
            text={isSigningIn ? "Signing In" : "Sign in"}
          />
          <span className="text-sm">
            Don't have an account yet?
            <span className="text-blue-500 cursor-pointer ml-2">
              <a href="/signup">Sign Up </a>
            </span>
          </span>
        </form>
      </Container>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div className="p-5">
          <h1 className="text-white font-bold text-4xl">
            One Click - One Apply
          </h1>
          <p className="text-white mt-1 font-poppins">
            The most popular platform for finding your perfect flatmate
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
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
