import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm w-full mx-auto">
      <div className="relative h-80 w-full">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={`${firstName}'s profile`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-6xl font-bold text-gray-400">
              {firstName.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-200 text-lg">
              {age} • {gender}
            </p>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="min-h-20 mb-4">
          <p className="text-gray-700">
            {about || "No bio provided"}
          </p>
        </div>
        
        <div className="flex gap-4 justify-center mt-6">
          <button
            className="w-1/2 py-3 rounded-full bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Skip
          </button>
          <button
            className="w-1/2 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 transition"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;