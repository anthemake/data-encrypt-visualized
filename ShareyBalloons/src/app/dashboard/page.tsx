"use client";

import { useState, useEffect } from "react";
import { fetchNonExpiredFiles } from "../../utils/azureBlobStorage";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      // Fetch non-expired files on load
      fetchNonExpiredFiles().then((fileList) => {
        setFiles(fileList);
        setLoading(false);
      });
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-gray-700">
          Please sign in to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {user?.firstName || "User"}! 👋
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Here are your uploaded files:
        </p>

        {loading ? (
          <p className="text-center text-gray-600">Loading files...</p>
        ) : files.length > 0 ? (
          <ul className="space-y-4">
            {files.map((file, index) => (
              <li
                key={index}
                className="p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-md flex items-center justify-between"
              >
                <span className="truncate">{file.name}</span>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline ml-4"
                >
                  View File
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No files available.</p>
        )}

        <div className="mt-8">
          <SignOutButton>
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
