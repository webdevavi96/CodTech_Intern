import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../contexts/authContext.jsx";

function ProfileUpdate() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated:", formData);
  };

  return (
    <div className="min-h-screen bg-[#e1ecf7] p-4 md:p-6">

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-2 hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          Edit Profile
        </h1>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl rounded-xl border bg-white shadow-sm"
      >

        {/* Section Header */}
        <div className="border-b bg-gray-100 px-6 py-4 font-semibold text-gray-700">
          Personal Information
        </div>

        {/* Fields */}
        <div className="grid gap-4 p-6 md:grid-cols-2">

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="rounded border px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="rounded border px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              className="rounded border px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t bg-gray-50 px-6 py-4">
          <button
            type="submit"
            className="rounded bg-[#009DFF] px-5 py-2 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded border px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileUpdate;