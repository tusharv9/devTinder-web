import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            DevTinder
          </h1>
          <p className="text-purple-300 mt-2">
            Connect with developers who match your coding style
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-2xl border border-purple-500/30 overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-center text-white mb-6">
              {isLoginForm ? "Login" : "Create Account"}
            </h2>

            {!isLoginForm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-purple-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-purple-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-purple-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={emailId}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-purple-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/40 border border-red-500/50 rounded-md">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-md shadow transition-colors duration-300"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Create Account"}
            </button>

            <div className="mt-6 text-center">
              <p
                className="text-sm text-purple-300 cursor-pointer hover:text-pink-400 transition-colors"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                {isLoginForm
                  ? "New to DevTinder? Create an account"
                  : "Already have an account? Login"}
              </p>
            </div>
          </div>
          
          <div className="px-8 py-4 bg-gray-900 border-t border-purple-500/20 text-center">
            <p className="text-xs text-gray-400">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;