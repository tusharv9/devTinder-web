import "./index.css";
import React from "react";
import Body from "./Body";
import { BrowserRouter, Routes,Route } from "react-router";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
