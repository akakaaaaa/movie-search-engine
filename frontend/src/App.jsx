import React from "react";
import "./css/App.css";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Favorites } from "./pages/Favorites";
import { Navbar } from "./components/Navbar";
import { useState, useEffect } from "react";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
