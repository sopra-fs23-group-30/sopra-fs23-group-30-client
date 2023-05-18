import {
  AtSymbolIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { api } from "helpers/api";
import React, { useState } from "react";
import Button from "../../components/general/Button";
import IconTextInput from "../../components/general/IconTextInput";
import Label from "../../components/general/Label";

export default function Signup() {
  const [generalInformationSuccessful, setGeneralInformationSuccessful] =
    useState(false);
  const [accountTypeSuccessful, setAccountTypeSuccessful] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatedPassword, setRepeatedPassword] = useState();
  const [isSearcher, setIsSearcher] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");

  const goToNextScreen = async (e) => {
    if (validate()) {
      setFirstnameError("");
      setLastnameError("");
      setEmailError("");
      setPhoneError("");
      setPasswordError("");
      setPasswordRepeatError("");
      setGeneralInformationSuccessful(true);
    } else {
      e.preventDefault();
    }
  };

  const signup = async (e) => {
    setIsSigningUp(true);
    e.preventDefault();

    if (repeatedPassword !== password) {
      setErrorMsg("Passwords do not match");
      setIsSigningUp(false);
      return;
    }

    const requestBody = JSON.stringify({
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      isSearcher,
    });

    const config = {
      headers: { Authorization: `Bearer ` },
    };

    let response = await api
      .post("/registration", requestBody, config)
      .catch(function (error) {
        setErrorMsg("Registration failed, please try again");
        setAccountTypeSuccessful(false);
        setGeneralInformationSuccessful(false);
        return;
      });

    if (response.status === 201) {
      setAccountTypeSuccessful(true);
    } else {
    }
    setIsSigningUp(false);
  };

  const validate = () => {
    if (!firstname) {
      setFirstnameError("Please enter your firstname");
    } else {
      setFirstnameError("");
    }
    if (!lastname) {
      setLastnameError("Please enter your lastname");
    } else {
      setLastnameError("");
    }
    if (!email) {
      setEmailError("Please enter your email");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
    if (!phoneNumber) {
      setPhoneError(
        "Please enter your phone number in the format !41 XX XXX XX XX"
      );
    } else {
      setPhoneError("");
    }
    if (password !== repeatedPassword) {
      setPasswordError("Passwords do not match");
      setPasswordRepeatError("Passwords do not match");
    } else if (!password && repeatedPassword) {
      setPasswordError("Please enter your password");
    } else if (password && !repeatedPassword) {
      setPasswordRepeatError("");
    } else if (!password && !repeatedPassword) {
      setPasswordError("Please enter your password");
      setPasswordRepeatError("Please enter your password");
    } else {
      setPasswordError("");
      setPasswordRepeatError("");
    }
    if (
      firstname &&
      lastname &&
      email &&
      phoneNumber &&
      password &&
      repeatedPassword &&
      password === repeatedPassword
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="h-screen md:flex">
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          {!generalInformationSuccessful && !accountTypeSuccessful && (
            <form
              noValidate
              className="bg-white w-3/4"
              onSubmit={goToNextScreen}
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Welcome!
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-5">
                Fill out the following form & you're ready to go!
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center py-2">
                  <Label value="Firstname" />
                  <IconTextInput
                    colorscheme={firstnameError === "" ? "primary" : "failure"}
                    placeholder={"Hans"}
                    type={"text"}
                    icon={UserIcon}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  {firstnameError !== "" && (
                    <p className="text-sm text-red-500">{firstnameError}</p>
                  )}
                </div>
                <div className="flex flex-col items-center py-2">
                  <Label value="Lastname" />
                  <IconTextInput
                    colorscheme={lastnameError === "" ? "primary" : "failure"}
                    placeholder={"Muster"}
                    type={"text"}
                    icon={UserIcon}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  {lastnameError !== "" && (
                    <p className="text-sm text-red-500">{lastnameError}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center py-2">
                  <Label value="Email" />
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
                <div className="flex flex-col items-center py-2">
                  <Label value="Phone" />
                  <IconTextInput
                    colorscheme={phoneError === "" ? "primary" : "failure"}
                    placeholder={"+41 XX XXX XX XX"}
                    type={"tel"}
                    icon={PhoneIcon}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {phoneError !== "" && (
                    <p className="text-sm text-red-500">{phoneError}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <Label value="Password" />
                <IconTextInput
                  colorscheme={passwordError === "" ? "primary" : "failure"}
                  placeholder={"********"}
                  type={"password"}
                  icon={LockClosedIcon}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError !== "" && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>

              <div className="mb-6">
                <Label value="Repeat Password" />
                <IconTextInput
                  colorscheme={
                    passwordRepeatError === "" ? "primary" : "failure"
                  }
                  placeholder={"********"}
                  type={"password"}
                  icon={LockClosedIcon}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                />
                {passwordRepeatError !== "" && (
                  <p className="text-sm text-red-500">{passwordRepeatError}</p>
                )}
              </div>

              <p className="text-sm text-red-500">{errorMsg}</p>

              <Button
                type="submit"
                width="w-max"
                isloading={0}
                text={"Register"}
              />

              <span className="text-sm ml-2">
                Already have an account?
                <span className="text-blue-500 cursor-pointer ml-2">
                  <a href="/signin">Sign In </a>
                </span>
              </span>
            </form>
          )}

          {generalInformationSuccessful && !accountTypeSuccessful && (
            <div className="bg-white dark:bg-gray-900">
              <div className="container px-6 py-8 mx-auto">
                <p className="text-xl text-center text-gray-500 dark:text-gray-300">
                  Choose your account type
                </p>

                <h1 className="mt-4 text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
                  Account Types
                </h1>

                <div className="mt-6 space-y-8 xl:mt-12">
                  <div
                    onClick={() => {
                      setIsSearcher(true);
                    }}
                    className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl dark:border-gray-700"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-400 sm:h-9 sm:w-9"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        {isSearcher && (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>

                      <div className="flex flex-col items-center mx-5 space-y-1">
                        <h2 className="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">
                          I'm a Searcher
                        </h2>
                        <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full sm:px-4 sm:py-1 dark:bg-gray-700 ">
                          You are a student, searching for a room / apartment to
                          move into.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setIsSearcher(false);
                    }}
                    className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl dark:border-gray-700"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-400 sm:h-9 sm:w-9"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        {!isSearcher && (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>

                      <div className="flex flex-col items-center mx-5 space-y-1">
                        <h2 className="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">
                          I'm a Lister
                        </h2>
                        <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full sm:px-4 sm:py-1 dark:bg-gray-700 ">
                          You are searching for a student to rent a
                          room/apartment to.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <span
                        className="text-blue-500 cursor-pointer ml-2"
                        onClick={() => setGeneralInformationSuccessful(false)}
                      >
                        back
                      </span>
                      <Button
                        onClick={signup}
                        type="submit"
                        isloading={isSigningUp ? 1 : undefined}
                        text={
                          isSigningUp ? "Creating Account..." : "Create Account"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {generalInformationSuccessful && accountTypeSuccessful && (
            <div>
              <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
                <div className="max-w-xl px-5 text-center">
                  <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
                    Account created
                  </h2>
                  <p className="mb-2 text-lg text-zinc-500">
                    We are glad, that you’re with us{" "}
                    <span className="font-medium text-indigo-500">
                      {firstname}
                    </span>
                    !
                  </p>
                  <a
                    href="/signin"
                    className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
                  >
                    Sign in to the App →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div className="p-5">
            <h1 className="text-white font-bold text-4xl">
              One Click - One Apply
            </h1>
            <p className="text-white mt-1">
              The most popular platform for finding your perfect flatmate
            </p>
            <button
              type="button"
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
    </div>
  );
}
