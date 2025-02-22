import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Rescue() {
  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [formData, setFormData] = useState({
    address: "",
    rescueAddress: "",
    name: "",
    email: "",
    contact: "",
    suspectCondition: "",
    animalType: "",
    donationAmount: "",
    image: null,
    location: { lat: null, lng: null },
  });

  const [useUserLocation, setUseUserLocation] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API key is not set.");
      return;
    }

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initAutocomplete();
        initMap();
      };
      document.head.appendChild(script);
    } else {
      initAutocomplete();
      initMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initAutocomplete = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places)
      return;
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["geocode"] }
    );
    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  const initMap = () => {
    if (!window.google || !window.google.maps) return;
    // Set a default location, e.g., San Francisco
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 13,
    });
    markerRef.current = new window.google.maps.Marker({
      position: defaultLocation,
      map: mapInstance,
    });
    // When map is clicked, update marker and reverse geocode to get address
    mapInstance.addListener("click", (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      markerRef.current.setPosition(e.latLng);
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: e.latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          setFormData((prev) => ({
            ...prev,
            rescueAddress: results[0].formatted_address,
            location: { lat, lng },
          }));
        }
      });
    });
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setFormData((prev) => ({
      ...prev,
      rescueAddress: place.formatted_address || "",
      location: { lat, lng },
    }));
    // Update marker position on the map if available.
    if (markerRef.current && window.google) {
      markerRef.current.setPosition(place.geometry.location);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useUserLocation) {
      setFormData((prev) => ({ ...prev, rescueAddress: prev.address }));
    }
    navigate("/rescue-status", { state: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-lg font-bold mb-3 text-gray-800 text-center">
          🚑 Emergency Rescue Panel
        </h2>

        <div className="flex flex-col md:flex-row md:flex-wrap md:space-x-4">
          <div className="bg-gray-50 p-3 rounded-lg shadow-md mb-3 flex-1">
            <h3 className="font-semibold text-gray-700 mb-2">User Details</h3>
            <label className="font-medium text-gray-600">Full Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Enter Name"
              required
            />

            <label className="font-medium text-gray-600">Email:</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Enter Email"
              required
            />

            <label className="font-medium text-gray-600">Contact Number:</label>
            <input
              name="contact"
              type="tel"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Enter Contact"
              required
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg shadow-md mb-3 flex-1">
            <h3 className="font-semibold text-gray-700 mb-2">
              Animal Rescue Details
            </h3>
            <label className="font-medium text-gray-600">
              Rescue Location:
            </label>
            <input
              ref={inputRef}
              name="rescueAddress"
              value={formData.rescueAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Enter Rescue Location"
              required
            />

            {/* Map container */}

            <label className="font-medium text-gray-600">Animal Type:</label>
            <select
              name="animalType"
              value={formData.animalType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              required
            >
              <option value="">Select Animal Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
            </select>

            <label className="font-medium text-gray-600">
              Describe Condition:
            </label>
            <textarea
              name="suspectCondition"
              value={formData.suspectCondition}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Describe the Condition of Suspect"
              required
            ></textarea>

            <label className="font-medium text-gray-600">
              Upload Animal Image:
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-md mb-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-500 text-white p-2 rounded-md mt-3 w-full"
        >
          Submit Rescue Request
        </button>
      </div>
    </form>
  );
}

export default Rescue;
