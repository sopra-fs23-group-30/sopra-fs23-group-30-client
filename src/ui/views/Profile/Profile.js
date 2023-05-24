import { Button } from "flowbite-react";
import { api } from "helpers/api";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";
import EditableDate from "ui/components/general/EditableDate";
import InputSelector from "ui/components/general/EditableInputSelector";
import EditableLifespan from "ui/components/general/EditableLifespan";
import EditableString from "ui/components/general/EditableString";
import EditableTextarea from "ui/components/general/EditableTextarea";

export default function ProfilePage(props) {
  const [profileData, setProfileData] = useState(null);
  const [lifespans, setLifespans] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [pictureUploadError, setPictureUploadError] = useState("");
  const [debtDocumentError, setDebtDocumentError] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedDocument, fileRejections) => {
    const formData = new FormData();
    if (fileRejections[0]) {
      setDebtDocumentError("Error: Only PDFs can be uploaded");
    } else {
      setDebtDocumentError("");
      formData.append("document", acceptedDocument[0]);
      setCurrentDocument(acceptedDocument[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    minSize: 0,
  });

  const handleRemoveFile = () => {
    setDebtDocumentError("");
    let blob = new Blob();
    blob.name = "deleted";
    setCurrentDocument(null);
    updateProfile(lifespans, getUnchangedFileBlob(), blob);
  };

  const handlePDFUpload = () => {
    updateProfile(lifespans, getUnchangedFileBlob(), currentDocument);
  };

  let params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      loadProfile(params.id).catch(console.error);
    };
    fetchData();
  }, [params.id]);

  const loadProfile = async (profileId) => {
    let token = localStorage.getItem("authtoken");
    const decoded = decodeToken(token);
    const userId = decoded.userId;

    if (userId === profileId) {
      setCanEdit(true);
    }

    let response = await api.get("/profiles/" + profileId);
    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    setProfileData(response.data);
    setLifespans(response.data.lifespans);
  };

  const getUnchangedFileBlob = () => {
    let blob = new Blob();
    blob.name = "unchanged";
    return blob;
  };

  const handleFirstnameChange = (newVal) => {
    let existingData = profileData;
    existingData.firstname = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob(), getUnchangedFileBlob());
  };

  const handleLastnameChange = (newVal) => {
    let existingData = profileData;
    existingData.lastname = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob(), getUnchangedFileBlob());
  };

  const handleBirthdateChange = (newVal) => {
    let existingData = profileData;
    existingData.birthday = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob(), getUnchangedFileBlob());
  };

  const handlePhonenumber = (newVal) => {
    let existingData = profileData;
    existingData.phoneNumber = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob(), getUnchangedFileBlob());
  };

  const handleGender = (newVal) => {
    let existingData = profileData;
    existingData.gender = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob(), getUnchangedFileBlob());
  };

  const handleBiography = (newVal) => {
    let existingData = profileData;
    existingData.biography = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob(), getUnchangedFileBlob());
  };

  const handleFlatemateDescription = (newVal) => {
    let existingData = profileData;
    existingData.futureFlatmatesDescription = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob(), getUnchangedFileBlob());
  };

  const handleLifespansChanged = (newLifespans) => {
    const saveableArray = newLifespans.map((item) => {
      delete item.isPersisted; // remove the "age" property from each object
      delete item.isEditing;
      return item;
    });

    updateProfile(
      saveableArray,
      getUnchangedFileBlob(),
      getUnchangedFileBlob()
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 1048576) {
      alert("File is too big! (over 1MB)");
      return;
    }

    const fileType = file.type;
    if (!fileType.match("image.*")) {
      setPictureUploadError("Error: Only images can be uploaded");
    } else {
      setPictureUploadError("");
      updateProfile(lifespans, file, getUnchangedFileBlob());
    }
  };

  const handleDeletePicture = () => {
    setPictureUploadError("");
    let blob = new Blob();
    blob.name = "deleted";
    updateProfile(lifespans, blob, getUnchangedFileBlob());
  };

  const updateProfile = async (updatedLifespans, file, document) => {
    let token = localStorage.getItem("authtoken");
    const decoded = decodeToken(token);
    const userId = decoded.userId;

    let updateData = profileData;
    updateData.lifespans = updatedLifespans;

    const { email, ...newObj } = updateData;

    const formData = new FormData();
    formData.append("body", JSON.stringify(newObj));
    formData.append("file", file, file.name);
    formData.append("document", document, document.name);

    try {
      let response = await api.put("/profiles/" + userId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 204) {
        toast("Save successful", {
          duration: 4000,
          position: "top-right",
          icon: "✅",
        });
      } else {
        toast("Save unsuccessful", {
          duration: 4000,
          position: "top-right",
          icon: "❌",
        });
      }
    } catch (ex) {
      toast("Save unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }

    loadProfile(params.id);
    props.updateNavbar();
  };

  return (
    <div className="py-2.5 sm:px-4 rounded px-4 md:mx-48 pb-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <div className="group">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white group-hover:text-blue-600"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 mr-2 hover:text-blue-600 text-gray-400 group-hover:text-blue-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                ></path>
              </svg>
              Back
            </button>
          </div>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href={"/profile/" + params.id}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Profile Page {profileData?.firstname} {profileData?.lastname}
              </a>
            </div>
          </li>
        </ol>
      </nav>
      {canEdit ? (
        <h1 className="mt-3 font-bold">My Profile</h1>
      ) : (
        <h1 className="mt-3 font-bold">{profileData?.firstname}'s Profile</h1>
      )}

      <div className="flex flex-col xl:grid grid-cols-5 grid-rows-1 ml-4 mt-4">
        <div className="col-span-1 row-span-1 h-full flex flex-col items-center w-full">
          <h2 className="font-sm mb-2 text-sm">Photo</h2>
          {profileData?.profilePictureURL && (
            <img
              src={profileData?.profilePictureURL}
              alt="face of lister / searcher"
              className="rounded-full bg-gray-900 w-36 aspect-square text-white flex items-center justify-center object-cover"
            />
          )}

          {!profileData?.profilePictureURL && (
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="face of lister / searcher"
              className="rounded-full bg-gray-900 w-36 aspect-square text-white flex items-center justify-center"
            />
          )}
          {canEdit && (
            <div className="flex flex-col text-center gap-2 p-4">
              <div>
                <input
                  type="file"
                  name="uploadfile"
                  id="img"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  for="img"
                  className="text-white text-center focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-secondary hover:bg-primary focus:outline-none"
                >
                  Change Photo
                </label>
              </div>

              <button
                onClick={() => {
                  handleDeletePicture();
                }}
                className="text-sm mt-2 text-red-600 text-center items-center hover:underline"
              >
                Delete
              </button>
              {pictureUploadError !== "" && (
                <p className="text-sm text-red-500">{pictureUploadError}</p>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col col-span-4">
          <div className="flex flex-row lg:flex-row gap-4 pb-4">
            <div className="flex flex-col gap-2 w-full xl:w-1/3">
              <div className="flex flex-col md:grid grid-cols-2 grid-rows-1 gap-2 gap-y-0 w-full pt-4 ">
                <EditableString
                  className="col-span-1"
                  label="Firstname"
                  content={profileData?.firstname}
                  onSave={handleFirstnameChange}
                  canEdit={canEdit}
                  regex=""
                />
                <EditableString
                  className="col-span-1"
                  label="Lastname"
                  content={profileData?.lastname}
                  onSave={handleLastnameChange}
                  canEdit={canEdit}
                  regex="^[A-Za-z]+$"
                />
                <div className="col-span-2 w-full">
                  <EditableString
                    label="Phone"
                    content={profileData?.phoneNumber}
                    onSave={handlePhonenumber}
                    canEdit={canEdit}
                    regex="(\+41)\s(\d{2})\s(\d{3})\s(\d{2})\s(\d{2})$"
                    errormessage={
                      "Please enter a phone number in the format +41 XX XXX XX XX"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 xl:pt-20">
            <div className="w-full md:w-1/2">
              <EditableDate
                label="Birthdate"
                content={profileData?.birthday}
                onSave={handleBirthdateChange}
                canEdit={canEdit}
              />
              <InputSelector
                label="Gender"
                content={profileData?.gender}
                options={["Other", "Male", "Female"]}
                onSave={handleGender}
                canEdit={canEdit}
              />
              {canEdit ? (
                <EditableTextarea
                  label="About Me"
                  content={profileData?.biography}
                  onSave={handleBiography}
                  canEdit={canEdit}
                />
              ) : (
                <EditableTextarea
                  label={`About ${profileData?.firstname}`}
                  content={profileData?.biography}
                  onSave={handleBiography}
                />
              )}
              {canEdit ? (
                <EditableTextarea
                  label="I am looking for"
                  content={profileData?.futureFlatmatesDescription}
                  onSave={handleFlatemateDescription}
                  canEdit={canEdit}
                />
              ) : (
                <EditableTextarea
                  label={`${profileData?.firstname} is looking for`}
                  content={profileData?.futureFlatmatesDescription}
                  onSave={handleFlatemateDescription}
                  canEdit={canEdit}
                />
              )}
            </div>
            <div className="w-full md:w-1/2 flex flex-col mb-3">
              <EditableLifespan
                label="Education"
                canEdit={canEdit}
                onChange={handleLifespansChanged}
                lifespans={lifespans}
              />
              <EditableLifespan
                label="Experience"
                canEdit={canEdit}
                onChange={handleLifespansChanged}
                lifespans={lifespans}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <label
              htmlFor="small-input"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Debt collection register extract
            </label>
            {profileData?.documentURL ? (
              <a
                href={profileData.documentURL}
                className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              >
                <div className="flex items-center ">
                  <span>See debt collection register extract</span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="pl-1 w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    ></path>
                  </svg>
                </div>
              </a>
            ) : (
              <p className="text-sm text-gray-900 dark:text-gray-100">
                No debt collection register extract uploaded
              </p>
            )}
            {canEdit && (
              <>
                <div className="container text-center mt-1">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        {currentDocument ? (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {currentDocument.name}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF Document
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    className="bg-secondary hover:bg-primary"
                    onClick={handlePDFUpload}
                  >
                    Upload
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleRemoveFile}
                  >
                    Remove
                  </Button>
                </div>
                {debtDocumentError !== "" && (
                  <p className="text-sm text-red-500">{debtDocumentError}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
