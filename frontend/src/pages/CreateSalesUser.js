import React, { useState } from "react";
import axios from "axios";

const CreateSalesUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        { ...formData, role: "sales" }, // Role is fixed to "sales"
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(response.data.message);
      setError("");
      setFormData({
        username: "",
        email: "",
        password: "",
        name: "",
        phone: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create sales user.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl transition-all duration-300">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
        Create
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#COEB6A] hover:ring-[#COEB6A] transition-all duration-200 active:ring-[#COEB6A]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#COEB6A] hover:ring-[#COEB6A] transition-all duration-200 active:ring-[#COEB6A]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#COEB6A] hover:ring-[#COEB6A] transition-all duration-200 active:ring-[#COEB6A]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#COEB6A] hover:ring-[#COEB6A] transition-all duration-200 active:ring-[#COEB6A]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#COEB6A] hover:ring-[#COEB6A] transition-all duration-200 active:ring-[#COEB6A]"
            required
          />
        </div>
        <div className="mb-6 text-center">
          <button
            type="submit"
            className="w-1/2 mx-auto p-3 bg-[#48B550] text-white font-semibold rounded-lg hover:bg-[#COEB6A] focus:outline-none transition-all duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSalesUser;
