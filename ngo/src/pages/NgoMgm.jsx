import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import FormDialog from "../components/FormDialog";

const NgoMgm = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (formData) => {
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic here
  };

  const sections = [
    // NGO Details Section
    {
      sectionTitle: "🏢 NGO Details",
      fields: [
        { label: "NGO Name", name: "ngoName", required: true },
        { label: "NGO Location", name: "ngoLocation", required: true },
        {
          label: "Type of NGO",
          name: "ngoType",
          type: "select",
          required: true,
          options: [
            { value: "type1", label: "Type 1" },
            { value: "type2", label: "Type 2" },
            { value: "type3", label: "Type 3" },
          ],
        },
      ],
    },
    // Owner Details Section
    {
      sectionTitle: "👤 Owner Details",
      fields: [
        { label: "Owner Name", name: "ownerName", required: true },
        { label: "Address", name: "address", required: true },
        { label: "Contact", name: "contact", required: true },
        { label: "Email", name: "email", required: true },
        { label: "Profession/Occupation", name: "profession", required: true },
      ],
    },
  ];

  return (
    <div className="p-4">
      <Button color="blue" onClick={handleOpen}>
        Create New NGO
      </Button>

      {/* Reusable FormDialog */}
      <FormDialog
        open={open}
        onClose={handleClose}
        title="Create New NGO"
        sections={sections}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default NgoMgm;