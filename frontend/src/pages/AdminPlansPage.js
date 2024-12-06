import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/slices/authSlice";

const AdminPlansPage = () => {
  const token = useSelector(selectToken);
  const [plans, setPlans] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/plans/plans-admin",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPlans(response.data);
    } catch (err) {
      setError("Failed to fetch plans. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Filter plans based on their status
  const filteredPlans = plans.filter((plan) => {
    if (filter === "all") return true;
    if (filter === "active") return !plan.discontinued;
    if (filter === "discontinued") return plan.discontinued;
    return true;
  });

  return (
    <div className="p-6 bg-[#F4F6F0] min-h-screen">
      <h1 className="text-3xl font-semibold text-[#485550] mb-6">All Plans</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="text-[#485550] font-medium">
          <strong>Filter by Status:</strong>
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-3 p-2 border border-[#485550] rounded-md focus:ring-2 focus:ring-[#C0EB6A] focus:outline-none"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </div>

      {/* Plans Table */}
      {filteredPlans.length === 0 ? (
        <p className="text-center text-lg text-[#485550]">No plans available for the selected filter.</p>
      ) : (
        <table className="min-w-full table-auto mt-4 border-separate border-spacing-0.5 rounded-lg shadow-md bg-white">
          <thead className="bg-[#C0EB6A]">
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-[#485550]">Plan Name</th>
              <th className="py-3 px-6 text-left font-semibold text-[#485550]">Description</th>
              <th className="py-3 px-6 text-left font-semibold text-[#485550]">Price</th>
              <th className="py-3 px-6 text-left font-semibold text-[#485550]">Service Provider</th>
              <th className="py-3 px-6 text-left font-semibold text-[#485550]">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan) => (
              <tr key={plan._id} className="hover:bg-[#F4F6F0]">
                <td className="py-3 px-6 text-[#485550]">{plan.planName}</td>
                <td className="py-3 px-6 text-[#485550]">{plan.description}</td>
                <td className="py-3 px-6 text-[#485550]">${plan.price}</td>
                <td className="py-3 px-6 text-[#485550]">{plan.serviceProvider}</td>
                <td className="py-3 px-6 text-[#485550]">
                  {plan.discontinued ? (
                    <span className="text-red-600 font-semibold">Discontinued</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPlansPage;
