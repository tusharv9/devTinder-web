import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <div className="flex items-center justify-center h-64 text-lg font-medium text-purple-300">Loading...</div>;

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-xl font-semibold text-pink-200">
        No connection found yet. Keep coding and swiping!
      </div>
    );

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-gray-900 to-purple-900 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-10">
        Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="rounded-lg overflow-hidden bg-gray-800 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-40 overflow-hidden">
                <img
                  alt="User"
                  className="w-full h-full object-cover"
                  src={photoUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 opacity-60"></div>
              </div>
              
              <div className="p-4 relative">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-20 rounded-full border-4 border-purple-500 overflow-hidden bg-gray-800">
                    <img
                      alt="User"
                      className="w-full h-full object-cover"
                      src={photoUrl}
                    />
                  </div>
                </div>
                
                <div className="pt-12 text-center">
                  <h2 className="text-xl font-bold text-white">
                    {firstName + " " + lastName}
                  </h2>
                  
                  {age && gender && (
                    <p className="text-sm text-purple-300 mt-1">
                      {age} years old, {gender}
                    </p>
                  )}
                  
                  {about && (
                    <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                      {about}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;