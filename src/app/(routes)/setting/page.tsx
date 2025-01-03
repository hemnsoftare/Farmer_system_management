"use client";
import React, { useState } from "react";
const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [teamEnabled, setTeamEnabled] = useState(true);
  const [productEnabled, setProductEnabled] = useState(false);
  const [blogEnabled, setBlogEnabled] = useState(true);
  const [categoryEnabled, setCategoryEnabled] = useState(false);

  const toggleMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      } flex items-center justify-center`}
    >
      <div className="w-[400px] rounded-xl shadow-xl text-white bg-gradient-to-b from-gray-700 to-gray-900 p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>

        {/* Search Settings */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Search Settings</h2>
          <div className="flex items-center justify-between">
            <span>Search</span>
            <input
              type="checkbox"
              className="toggle"
              checked={teamEnabled}
              onChange={() => setTeamEnabled(!teamEnabled)}
            />
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Teams</span>
            <input
              type="checkbox"
              className="toggle"
              checked={teamEnabled}
              onChange={() => setTeamEnabled(!teamEnabled)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Products</span>
            <input
              type="checkbox"
              className="toggle"
              checked={productEnabled}
              onChange={() => setProductEnabled(!productEnabled)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Blogs</span>
            <input
              type="checkbox"
              className="toggle"
              checked={blogEnabled}
              onChange={() => setBlogEnabled(!blogEnabled)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Categories</span>
            <input
              type="checkbox"
              className="toggle"
              checked={categoryEnabled}
              onChange={() => setCategoryEnabled(!categoryEnabled)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              className="toggle"
              checked={darkMode}
              onChange={toggleMode}
            />
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
            Delete Account
          </button>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Manage Account
          </button>
          <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">
            Clear All Favorites
          </button>
          <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">
            Clear Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
