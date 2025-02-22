import React, { useState, useEffect, useRef } from "react";
import FormDialog from "../components/FormDialog";

const Rescue = ({ isOpen, onClose }) => {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

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
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["geocode"] }
    );
    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = (formData, setFormData) => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setFormData((prev) => ({
      ...prev,
      rescueAddress: place.formatted_address || "",
      location: { lat, lng },
    }));
  };

  const handleSubmit = (formData) => {
    console.log("Rescue Form Data Submitted:", formData);
    onClose(); // Close the dialog after submission
  };

  const sections = [
    // User Details Section
    {
      sectionTitle: "👤 User Details",
      fields: [
        { label: "Full Name", name: "name", required: true },
        { label: "Email", name: "email", type: "email", required: true },
        { label: "Contact Number", name: "contact", type: "tel", required: true },
      ],
    },
    // Animal Rescue Details Section
    {
      sectionTitle: "🐶 Animal Rescue Details",
      fields: [
        {
          label: "Rescue Location",
          name: "rescueAddress",
          type: "autocomplete",
          required: true,
        },
        {
          label: "Animal Type",
          name: "animalType",
          type: "select",
          required: true,
          options: [
            { value: "Dog", label: "Dog" },
            { value: "Cat", label: "Cat" },
            { value: "Other", label: "Other" },
          ],
        },
        { label: "Describe Condition", name: "suspectCondition", type: "textarea", required: true },
        { label: "Upload Image", name: "image", type: "file", required: true },
      ],
    },
  ];

  return (
    <FormDialog
      open={isOpen}
      onClose={onClose}
      title="🚑 Emergency Rescue Panel"
      sections={sections}
      onSubmit={handleSubmit}
      handlePlaceSelect={handlePlaceSelect}
      inputRef={inputRef}
    />
  );
};

export default Rescue;