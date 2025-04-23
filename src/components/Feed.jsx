import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-purple-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-pink-500 border-purple-300 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg font-medium text-purple-300">Loading potential matches...</p>
      </div>
    </div>
  );

  if (feed.length <= 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-purple-900 px-6 text-center">
        <svg className="w-20 h-20 text-pink-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-3">
          No more users found
        </h1>
        <p className="text-gray-300 max-w-md">
          You've reviewed all available developers for now. Check back later for new coding matches!
        </p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 bg-gradient-to-b from-gray-900 to-purple-900">
      <div className="w-full max-w-2xl">
        <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
          DevTinder Feed
        </h2>
        <div className="transform transition-all hover:scale-102 duration-300">
          <UserCard user={feed[0]} />
        </div>
        <div className="mt-8 text-center text-sm text-purple-300">
          <p>Swipe right for a perfect code match!</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;