import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home  from "./pages/Home";
import StickyNavbar from "./components/StickyNavbar";
import Donation from "./components/Donation";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Pricing from "./pages/Pricing";
import RescueStatus from "./pages/RescueStatus";
import NgoMgm from "./pages/NgoMgm";

function App() {

  return (
    <>
      <StickyNavbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/rescue-status" element={<RescueStatus />} /> 
          <Route path="/NgoMgm" element={<NgoMgm />} /> 
        </Routes>
      </main>
    </>
  );
}

export default App;
