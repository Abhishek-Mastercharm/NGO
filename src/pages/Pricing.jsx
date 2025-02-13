import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic Plan",
      price: "₹499/month",
      features: ["Access to NGO Directory", "Basic Support", "Limited Reports"],
    },
    {
      name: "Standard Plan",
      price: "₹999/month",
      features: ["All Basic Features", "Priority Support", "Advanced Reports"],
    },
    {
      name: "Premium Plan",
      price: "₹1999/month",
      features: ["All Standard Features", "24/7 Support", "Custom Integrations"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center transition mb-4 shadow-md"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>

      {/* Pricing Section */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-black mb-6">📊 Subscription Plans</h1>
        <p className="text-gray-700 text-lg mb-8">
          Choose the best plan that suits your NGO platform needs.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h2>
              <p className="text-xl font-semibold text-blue-600">{plan.price}</p>
              <ul className="text-gray-700 mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
