import React, { useState } from "react";
import { Button, Dialog, Input, Select, Card, CardBody, Typography, Textarea } from "@material-tailwind/react";

const FormDialog = ({ open, onClose, title, sections, onSubmit, handlePlaceSelect, inputRef }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e, name) => {
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to the parent component
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <Card className="max-h-screen overflow-y-auto bg-gradient-to-bl from-amber-50 to-green-200">
        <CardBody>
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
            <div
              className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
              onClick={onClose}
            >
              <span className="text-gray-700 font-bold text-xl pb-1">×</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-300 rounded-lg p-4 space-y-4 mb-6">
                {/* Section Title */}
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  {section.sectionTitle}
                </Typography>

                {/* Fields in the Section */}
                {section.fields.map((field, fieldIndex) => {
                  if (field.type === "select") {
                    return (
                      <Select
                        key={fieldIndex}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={(value) => setFormData({ ...formData, [field.name]: value })}
                        required={field.required}
                        className="w-full"
                      >
                        {field.options.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    );
                  } else if (field.type === "textarea") {
                    return (
                      <Textarea
                        key={fieldIndex}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full"
                      />
                    );
                  } else if (field.type === "file") {
                    return (
                      <Input
                        key={fieldIndex}
                        label={field.label}
                        name={field.name}
                        type="file"
                        onChange={(e) => handleFileUpload(e, field.name)}
                        required={field.required}
                        className="w-full"
                      />
                    );
                  } else if (field.type === "autocomplete") {
                    return (
                      <Input
                        key={fieldIndex}
                        label={field.label}
                        name={field.name}
                        type="text"
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full"
                        ref={inputRef} // For Google Places Autocomplete
                      />
                    );
                  } else {
                    return (
                      <Input
                        key={fieldIndex}
                        label={field.label}
                        name={field.name}
                        type={field.type || "text"}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full"
                      />
                    );
                  }
                })}
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
};

export default FormDialog;