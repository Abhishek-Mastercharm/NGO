import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Rescue from "../pages/Rescue";

function HeroSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ donationAmount: "" });
  const [errors, setErrors] = useState({});

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleProceed = () => {
    const amount = formData.donationAmount.trim();
    if (!amount || isNaN(amount) || amount <= 0) {
      setErrors({ donationAmount: "Please enter a valid amount" });
      return;
    }
    navigate("/donation", { state: { donationAmount: amount } });
  };

  return (
    <div className="min-h-screen bg-yellow-200 flex justify-center items-center p-6">
      <div className="w-full max-w-6xl bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center">
        {/* Left Side - Hero Content */}
        <div className="w-full md:w-2/3 p-6 flex flex-col text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🐾 Save a Life, Make a Difference!
          </h1>
          <p className="text-gray-600 mb-6">
            Help provide emergency rescue services for stray and injured
            animals. Your support can save lives. Join us in making a real
            impact!
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Emergency Rescue Button */}
            <button
              className="bg-red-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-red-600 transition w-full md:w-auto"
              onClick={openDialog}
            >
              🚑 Emergency Rescue
            </button>
            {/* Donation Panel */}
            <div className="bg-green-50 p-3 rounded-lg shadow-md flex items-center w-full md:w-auto border-green-600 border-2">
              <label className="text-gray-700 font-bold mr-2">
                Donate For NGO:
              </label>
              <input
                name="donationAmount"
                value={formData.donationAmount}
                onChange={handleChange}
                className="w-full md:w-32 p-2 border rounded-md"
                placeholder=" ₹ Amount"
              />
              {errors.donationAmount && (
                <span className="text-red-500 text-sm ml-2">
                  {errors.donationAmount}
                </span>
              )}
              <button
                onClick={handleProceed}
                className="bg-green-500 text-white py-2 px-4 ml-3 rounded-md font-semibold hover:bg-green-600 transition"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
        {/* Right Side - Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0">
          <div
            className="w-60 h-60 md:w-80 md:h-80 bg-cover bg-center rounded-full shadow-lg"
            style={{
              backgroundImage:
                "url('https://mydigitalpet.com/cdn/shop/products/vector-art-or-white-background-my-digital-pet-13_300x.jpg?v=1664459563')",
            }}
          ></div>
        </div>
      </div>

      {/* Rescue Dialog */}
      <Rescue isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
}

export default HeroSection;