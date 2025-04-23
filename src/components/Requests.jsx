import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-t-pink-500 border-purple-300 rounded-full animate-spin"></div>
    </div>
  );

  if (requests.length === 0)
    return (
      <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-900 to-purple-900 flex flex-col items-center justify-center">
        <div className="w-20 h-20 text-purple-400 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
          No Connection Requests
        </h2>
        <p className="text-purple-300 text-center max-w-md">
          When developers want to connect with you, their requests will appear here.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-900 to-purple-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
          Connection Requests
        </h2>
        
        <div className="space-y-6">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;
            return (
              <div
                key={request._id}
                className="bg-gray-800 bg-opacity-70 rounded-xl shadow-lg border border-purple-500 border-opacity-30 backdrop-blur-sm overflow-hidden transform transition-all duration-300 hover:shadow-purple-500/20 hover:scale-102"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-24 h-24 mx-auto md:mx-0 flex-shrink-0">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={`${firstName}'s profile`}
                          className="w-full h-full object-cover rounded-full border-2 border-pink-500 shadow-lg"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg">
                          <span className="text-2xl font-bold text-white">
                            {firstName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {firstName + " " + lastName}
                      </h3>
                      {age && gender && (
                        <p className="text-purple-300 text-sm mb-2">
                          {age} • {gender}
                        </p>
                      )}
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {about || "No bio available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-end gap-4 mt-4">
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      className="px-6 py-2 bg-gray-700 text-gray-300 rounded-full font-medium hover:bg-gray-600 transition-all duration-300"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium shadow-md hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;