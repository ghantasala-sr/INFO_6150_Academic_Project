import React, { useEffect, useState } from "react";
import axios from "axios";

const MyTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState("");

  // Fetch team members
  const fetchTeam = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/sales",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTeamMembers(response.data);
    } catch (err) {
      setError("Failed to fetch team members.");
    }
  };

  // Delete a team member
  const deleteMember = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/api/users/sales/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeamMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (err) {
      setError("Failed to delete team member.");
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="p-6 bg-[#F4F6F0] min-h-screen">
      <h2 className="text-2xl font-semibold text-[#485550] mb-6">My Team</h2>
      {error && <p className="text-[#E74C3C] mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead className="bg-[#C0EB6A] text-[#485550]">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Username</th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Phone</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member._id} className="hover:bg-[#F4F6F0]">
                <td className="px-4 py-2">{member.username}</td>
                <td className="px-4 py-2">{member.email}</td>
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{member.phone}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteMember(member._id)}
                    className="text-white bg-[#E74C3C] px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
