import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Services from "./Pages/Services/Services";
import Blog from "./Components/Blog/Blog";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/about" element={<About/>} />
           <Route path="services/cash-services" element={<Services/>} />
           <Route path="/blog" element={<Blog/>} />
           <Route path="/blog-details" element={<BlogDetails/>} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;