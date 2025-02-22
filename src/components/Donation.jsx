import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { ArrowLeft } from "lucide-react"; // Back icon

const Donation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: 300, // Default donation amount
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required!";
    if (!formData.email.trim()) newErrors.email = "Email address is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email!";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Select a payment method!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: formData.amount * 100, // Amount in paise
      currency: "INR",
      name: "NGO Donation",
      description: "Support the cause",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900 transition duration-200"
        >
          <ArrowLeft size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center pb-2">Donate to Support</h2>
        <p className="text-center text-gray-600 mt-2">You are donating: ₹{formData.amount}</p>

        {/* Input Fields */}
        <div className="mt-4 space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md outline-none focus:border-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md outline-none focus:border-blue-500 ${
                errors.paymentMethod ? "border-red-500" : "border-gray-400"
              }`}
            >
              <option value="">Select Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
            )}
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            PROCEED TO PAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donation;
