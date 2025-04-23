import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-900 to-purple-900">
      <div className="flex flex-wrap justify-center items-start gap-10 max-w-6xl mx-auto">
        <div className="w-full max-w-md bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl border border-purple-500 border-opacity-30 backdrop-blur-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
              Edit Your Profile
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-purple-300 font-medium">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-purple-300 font-medium">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-purple-300 font-medium">Photo URL</label>
                <input
                  type="text"
                  value={photoUrl}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-purple-300 font-medium">Age</label>
                  <input
                    type="text"
                    value={age}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-purple-300 font-medium">Gender</label>
                  <input
                    type="text"
                    value={gender}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-purple-300 font-medium">About</label>
                <textarea
                  value={about}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-purple-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </div>
            
            {error && (
              <p className="mt-4 text-pink-500 text-center font-medium">{error}</p>
            )}
            
            <div className="mt-8 text-center">
              <button 
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="sticky top-10">
            <h3 className="text-center text-xl font-medium text-purple-300 mb-4">
              Profile Preview
            </h3>
            <div className="transform transition hover:scale-105 duration-300">
              <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 inset-x-0 flex justify-center items-start z-50">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-3 rounded-lg shadow-xl transform animate-bounce">
            Profile updated successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;