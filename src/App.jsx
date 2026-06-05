import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "../src/Components/Navbar";
import Footer from "../src/Components/Footer";
import Home from "./Pages/Home";
import Login from "../src/Pages/Login";
import About from "../src/Pages/About";
import Signup from "./Pages/Signup";
import Conntact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import Agent from "./Pages/Agent";
import BlogComponent from "./Components/BlogComponent";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {<Route path="/" element={<Home />} />}
        {<Route path="/login" element={<Login />} />}
        {<Route path="/signup" element={<Signup />} />}
        {<Route path="/about" element={<About />} />}
        {<Route path="/contact" element={<Conntact />} /> }
        {<Route path="/blog" element={<Blog />} /> }
        {<Route path="/agent" element={<Agent />} /> }
        {<Route path="/blog/:id" element={<BlogComponent />} /> }
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
