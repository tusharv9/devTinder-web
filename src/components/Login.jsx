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
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
  <div className="card w-full max-w-md bg-base-300 shadow-xl border border-base-content/10">
    <div className="card-body space-y-4">
      <h2 className="card-title justify-center text-2xl">
        {isLoginForm ? "Login" : "Sign Up"}
      </h2>

      {!isLoginForm && (
        <div className="grid grid-cols-1 gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
      )}

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Email Id</span>
        </div>
        <input
          type="email"
          value={emailId}
          className="input input-bordered w-full"
          onChange={(e) => setEmailId(e.target.value)}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          value={password}
          className="input input-bordered w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {error && <p className="text-error text-sm">{error}</p>}

      <div className="card-actions justify-center">
        <button
          className="btn btn-primary w-full"
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
      </div>

      <p
        className="text-center text-sm text-primary cursor-pointer hover:underline"
        onClick={() => setIsLoginForm((value) => !value)}
      >
        {isLoginForm
          ? "New User? Sign Up Here"
          : "Existing User? Login Here"}
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;
