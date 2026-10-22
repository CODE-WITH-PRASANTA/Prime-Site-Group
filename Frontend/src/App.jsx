import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;