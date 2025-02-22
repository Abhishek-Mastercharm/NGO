import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

function ContactUs() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center transition mb-4 shadow-md"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>

      {/* Contact Us Section */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl text-center border border-blue-200">
        <h1 className="text-4xl font-bold text-amber-500 mb-4">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-6">Have any questions? Reach out to us!</p>

        {/* Contact Info */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md mb-8 max-w-md mx-auto">
          <p className="text-gray-700 font-semibold">📍 Address: 123 Main Street, City, Country</p>
          <p className="text-gray-700 font-semibold">📧 Email: support@example.com</p>
          <p className="text-gray-700 font-semibold">📞 Phone: +123 456 7890</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-left font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-left font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-left font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              {...register("message")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows="4"
              placeholder="Write your message..."
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-amber-500 text-white w-full p-3 rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
