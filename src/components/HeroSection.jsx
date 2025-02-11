import React, { useState } from "react";
import Modal from "react-modal";
import Rescue from "../pages/Rescue";

Modal.setAppElement("#root"); // Required for accessibility

function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    donationAmount: "",
    name: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required";
      }
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    console.log("Form submitted", formData);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center p-6">
      <div className="w-full max-w-6xl bg-white p-8 rounded-xl shadow-lg relative flex flex-col md:flex-row items-center">
        {/* Left Side - Hero Content */}
        <div className="w-full md:w-2/3 p-6 flex flex-col items-center text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🐾 Save a Life, Make a Difference!
          </h1>
          <p className="text-gray-600 mb-6">
            Help provide emergency rescue services for stray and injured
            animals. Your support can save lives. Join us in making a real
            impact!
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <button
              className="bg-red-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-red-600 transition w-full md:w-auto"
              onClick={openModal}
            >
              🚑 Emergency Rescue
            </button>
            {/* Donation Panel */}
            <div className="bg-gray-50 p-3 rounded-lg shadow-md flex flex-col md:flex-row items-center w-full md:w-auto">
              <label className="text-gray-700 font-semibold mr-2">
                Donate For NGO:
              </label>
              <input
                name="donationAmount"
                value={formData.donationAmount}
                onChange={handleChange}
                className="w-full md:w-32 p-2 border rounded-md"
                placeholder="Amount"
              />
              {errors.donationAmount && (
                <span className="text-red-500 text-sm ml-2">
                  {errors.donationAmount}
                </span>
              )}
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-4 mt-2 md:mt-0 md:ml-3 rounded-md font-semibold hover:bg-green-600 transition w-full md:w-auto"
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
                "url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          ></div>
        </div>
      </div>
      {/* Emergency Rescue Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Emergency Rescue Form"
        className="bg-white p-6 rounded-lg shadow-xl max-w-5xl w-full mx-auto mt-20 relative overflow-y-auto max-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {/* Close Button */}
        <div
          className="absolute top-10 right-10 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
          onClick={closeModal}
        >
          <span className="text-gray-700 font-bold text-xl pb-1">×</span>
        </div>
        <Rescue />
      </Modal>
    </div>
  );
}

export default HeroSection;