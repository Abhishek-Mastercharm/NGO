import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { ArrowLeft } from "lucide-react";

function RescueStatus() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="w-full max-w-3xl">
        {/* Back Button - Modern Themed */}
        <button
          onClick={() => navigate(-1)}
          className="self-start bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center transition mb-4 shadow-md"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Rescue Status Card */}
        <Card className="w-full p-6 shadow-xl border border-blue-200 rounded-lg bg-white">
          <CardBody>
            <Typography
              variant="h4"
              className="text-center text-black font-bold mb-4"
            >
              🚑 Rescue Request Status
            </Typography>
            <Typography
              variant="paragraph"
              className="text-gray-700 text-center"
            >
              Your rescue request has been received. We are processing it and will update you shortly.
            </Typography>
            
            {/* Rescue Details */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <Typography variant="h6" className="text-gray-700 mb-2">
                <strong>Rescue ID:</strong> <span className="text-gray-900">#123456</span>
              </Typography>
              <Typography variant="h6" className="text-gray-700 mb-2">
                <strong>Status:</strong>
                <span className="ml-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                  In Progress
                </span>
              </Typography>
              <Typography variant="h6" className="text-gray-700">
                <strong>Estimated Response Time:</strong> <span className="text-gray-900">30 mins</span>
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default RescueStatus;
