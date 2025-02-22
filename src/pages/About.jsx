import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center transition mb-4 shadow-md"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>

      {/* About Content */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl border border-blue-200 text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4">About Us</h1>
        <p className="text-gray-700 text-lg">
          Welcome to our platform! We are dedicated to making a difference by
          connecting people with meaningful causes. Our mission is to empower
          individuals to contribute to society in impactful ways.
        </p>
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
          reprehenderit fugiat ea tenetur porro laborum quod voluptate molestiae
          nostrum, blanditiis nam sunt, harum quaerat nihil, quam a. Sapiente
          accusantium voluptatibus saepe nobis minus amet temporibus, non
          voluptates mollitia architecto assumenda ducimus ipsa animi placeat
          inventore labore voluptatum quas quibusdam dolorem.
        </p>
      </div>
    </div>
  );
}

export default About;
