import { useState } from "react";
import "./App.css";
// import Rescue  from "./pages/rescue";
import { Routes, Route } from "react-router-dom";
import Home  from "./pages/Home";
import StickyNavbar from "./components/StickyNavbar";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Pricing from "./pages/Pricing";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StickyNavbar />
      

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/rescue" element={<Rescue />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

// components with props - {name}
function Intro({name}){
  return(
    <>
      <p className="mb-3">{name}</p>
    </>
  )
}