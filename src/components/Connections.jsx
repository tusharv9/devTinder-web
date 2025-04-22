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

  if (!connections) return <div className="text-center my-10 text-lg">Loading...</div>;

  if (connections.length === 0)
    return (
      <div className="text-center my-10 text-xl font-semibold text-base-content">
        No connection found
      </div>
    );

  return (
    <div className="my-10 px-4">
      <h1 className="text-center text-3xl font-bold text-white mb-8">
        Connections
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="card bg-base-300 shadow-md w-72 p-4 flex flex-col items-center text-center"
            >
              <img
                alt="User"
                className="w-20 h-20 rounded-full object-cover border border-base-content/20 mb-3"
                src={photoUrl}
              />
              <div>
                <h2 className="text-lg font-bold text-base-content">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-base-content/70">
                    {age} years old, {gender}
                  </p>
                )}
                {about && (
                  <p className="text-sm text-base-content/80 mt-1">{about}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
