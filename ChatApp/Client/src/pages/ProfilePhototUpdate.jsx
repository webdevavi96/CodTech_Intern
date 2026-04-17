import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../contexts/authContext.jsx";
import { updateAvatar } from "../services/profileService.js";

function ProfilePhotoUpdate() {
    const navigate = useNavigate();
    const { user, refreshUser } = useContext(AuthContext);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(user?.profilePic || "");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        try {

            setIsSubmitting(true);
            const res = await updateAvatar(selectedFile);
            refreshUser(res);
            navigate(-1);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
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
                    Update Profile Photo
                </h1>
            </div>

            {/* Container */}
            <div className="mx-auto max-w-xl rounded-xl border bg-white shadow-sm">

                {/* Section Header */}
                <div className="border-b bg-gray-100 px-6 py-4 font-semibold text-gray-700">
                    Profile Picture
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-6 p-6">

                    {/* Preview */}
                    <div className="h-32 w-32 overflow-hidden rounded-full border">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* File Input */}
                    <label className="cursor-pointer rounded border px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Choose Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {/* Info */}
                    <p className="text-sm text-gray-500 text-center">
                        Supported formats: JPG, PNG. Max size: 2MB
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between border-t bg-gray-50 px-6 py-4">
                    <button
                        onClick={handleUpload}
                        disabled={isSubmitting}
                        className={`px-5 py-2 rounded text-white ${!isSubmitting
                            ? "bg-[#009DFF] hover:bg-blue-600"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {isSubmitting ? "Uplaoding" : "Upload"}
                    </button>

                    <button
                        disabled={isSubmitting}
                        onClick={() => navigate(-1)}
                        className="rounded border px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePhotoUpdate;