import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "motion/react"
import Navbar from "../src/Components/Navbar";
import Footer from "../src/Components/Footer";
import Home from "./Pages/Home";

function App() {
  return (
    
    <BrowserRouter>
    <Navbar/>
      <Routes>

        { <Route path="/" element={<Home />} /> }

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
