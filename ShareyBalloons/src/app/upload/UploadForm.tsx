"use client";

import { useState } from "react";
import { uploadFileToBlob } from "../../utils/azureBlobStorage";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccessUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }

    setIsUploading(true);

    try {
      const fileName = `${Date.now()}_${file.name}`;
      const fileUrl = await uploadFileToBlob(file, fileName);
      setSuccessUrl(fileUrl);
      setFile(null); // Clear file input after upload.
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-6">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Upload Your File 📤
        </h1>

        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all"
          >
            {file ? "Change File" : "Select File"}
          </label>
          {file && (
            <p className="mt-3 text-sm text-gray-600">
              Selected file: <strong>{file.name}</strong>
            </p>
          )}
        </div>

        {error && (
          <div className="mt-4 text-center text-red-500 text-sm">{error}</div>
        )}

        {successUrl && (
          <div className="mt-6 text-center text-green-500">
            <p>File uploaded successfully!</p>
            <a
              href={successUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-700"
            >
              View Uploaded File
            </a>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`mt-6 w-full px-6 py-3 text-white rounded-lg shadow-md ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          } font-semibold transition-all`}
        >
          {isUploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
}
