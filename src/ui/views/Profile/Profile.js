import { api } from "helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { useParams } from "react-router-dom";
import EditableDate from "ui/components/general/EditableDate";
import InputSelector from "ui/components/general/EditableInputSelector";
import EditableLifespan from "ui/components/general/EditableLifespan";
import EditableString from "ui/components/general/EditableString";
import EditableTextarea from "ui/components/general/EditableTextarea";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [lifespans, setLifespans] = useState([]);
  const [canEdit, setCanEdit] = useState(false);

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
    updateProfile(lifespans, getUnchangedFileBlob());
  };

  const handleLastnameChange = (newVal) => {
    let existingData = profileData;
    existingData.lastname = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob());
  };

  const handleBirthdateChange = (newVal) => {
    let existingData = profileData;
    existingData.birthday = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob());
  };

  const handlePhonenumber = (newVal) => {
    let existingData = profileData;
    existingData.phoneNumber = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob());
  };

  const handleGender = (newVal) => {
    let existingData = profileData;
    existingData.gender = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob());
  };

  const handleBiography = (newVal) => {
    let existingData = profileData;
    existingData.biography = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob());
  };

  const handleFlatemateDescription = (newVal) => {
    let existingData = profileData;
    existingData.futureFlatmatesDescription = newVal;
    setProfileData(existingData);
    updateProfile(lifespans, getUnchangedFileBlob());
  };

  const handleLifespansChanged = (newLifespans) => {
    const saveableArray = newLifespans.map((item) => {
      delete item.isPersisted; // remove the "age" property from each object
      delete item.isEditing;
      return item;
    });

    updateProfile(saveableArray, getUnchangedFileBlob());
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    updateProfile(lifespans, file);
  };

  const handleDeletePicture = () => {
    let blob = new Blob();
    blob.name = "deleted";
    updateProfile(lifespans, blob);
  };

  const updateProfile = async (updatedLifespans, file) => {
    let token = localStorage.getItem("authtoken");
    const decoded = decodeToken(token);
    const userId = decoded.userId;

    let updateData = profileData;
    updateData.lifespans = updatedLifespans;

    const { profilePictureURL, email, ...newObj } = updateData;

    const formData = new FormData();
    formData.append("body", JSON.stringify(newObj));
    formData.append("file", file, file.name);

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
  };

  return (
    <div className="px-2 py-2.5 sm:px-4 rounded px-4 md:mx-48">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
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
      <h1 className="mt-8 ml-4 text-lg font-medium text-gray-900">
        My Profile
      </h1>
      <div className="flex flex-col xl:grid grid-cols-5 grid-rows-3 ml-4 flex flex-col mt-4">
        <div className="col-span-1 row-span-1 h-full flex flex-col items-center w-full">
          <h2 className="font-sm mb-2 text-sm">Profile Pic</h2>
          {profileData?.profilePictureURL && (
            <img
              src={profileData?.profilePictureURL}
              alt="face of lister / searcher"
              className="rounded-full bg-gray-900 w-36 aspect-square text-white flex items-center justify-center"
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
            <div className="flex flex-col justify-center justify-items-start gap-2 p-4">
              <div>
                <input
                  type="file"
                  name="uploadfile"
                  id="img"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  for="img"
                  className="text-white text-center bg-secondary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Change Photo
                </label>
              </div>

              <button
                onClick={() => {
                  handleDeletePicture();
                }}
                className="text-sm mt-2 text-primary text-center items-center hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="col-start-2 col-span-4 row-span-1 flex flex-row lg:flex-row gap-2">
          <div className="flex flex-col gap-2 w-full xl:w-1/3">
            <div className="flex flex-col md:grid grid-cols-2 grid-rows-auto gap-2 w-full">
              <EditableString
                className="col-span-1"
                label="Firstname"
                content={profileData?.firstname}
                onSave={handleFirstnameChange}
                canEdit={canEdit}
              />
              <EditableString
                className="col-span-1"
                label="Lastname"
                content={profileData?.lastname}
                onSave={handleLastnameChange}
                canEdit={canEdit}
              />
              <div className="col-span-2 w-full">
                <EditableString
                  label="Phone"
                  content={profileData?.phoneNumber}
                  onSave={handlePhonenumber}
                  canEdit={canEdit}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-2 col-span-4 row-span-2 flex flex-col md:flex-row justify-between gap-4">
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
              options={["Male", "Female", "Other"]}
              onSave={handleGender}
              canEdit={canEdit}
            />
            <EditableTextarea
              label="About Me"
              content={profileData?.biography}
              onSave={handleBiography}
              canEdit={canEdit}
            />
            <EditableTextarea
              label="I am looking for"
              content={profileData?.futureFlatmatesDescription}
              onSave={handleFlatemateDescription}
              canEdit={canEdit}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
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
      </div>
    </div>
  );
}
