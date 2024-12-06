import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [verifiedStudents, setVerifiedStudents] = useState([]);
  const [unverifiedStudents, setUnverifiedStudents] = useState([]);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/students",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const verified = response.data.filter(
        (student) => student.studentDetails?.isStudentVerified
      );
      const unverified = response.data.filter(
        (student) => !student.studentDetails?.isStudentVerified
      );

      setVerifiedStudents(verified);
      setUnverifiedStudents(unverified);
    } catch (err) {
      setError("Failed to fetch students.");
    }
  };

  const toggleVerification = async (student) => {
    const token = localStorage.getItem("token");
    const isCurrentlyVerified = student.studentDetails?.isStudentVerified;

    try {
      await axios.patch(
        `http://localhost:8000/api/users/${student._id}/verify`,
        { isStudentVerified: !isCurrentlyVerified },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (isCurrentlyVerified) {
        setVerifiedStudents((prev) =>
          prev.filter((s) => s._id !== student._id)
        );
        setUnverifiedStudents((prev) => [
          ...prev,
          {
            ...student,
            studentDetails: {
              ...student.studentDetails,
              isStudentVerified: false,
            },
          },
        ]);
      } else {
        setUnverifiedStudents((prev) =>
          prev.filter((s) => s._id !== student._id)
        );
        setVerifiedStudents((prev) => [
          ...prev,
          {
            ...student,
            studentDetails: {
              ...student.studentDetails,
              isStudentVerified: true,
            },
          },
        ]);
      }
    } catch (err) {
      setError("Failed to update student verification status.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Unverified Students */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Unverified Students
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#C0EB6A]">
            <tr>
              <th className="px-4 py-2 text-left font-semibold w-1/6">Name</th>
              <th className="px-4 py-2 text-left font-semibold w-1/4">College Name</th>
              <th className="px-4 py-2 text-left font-semibold w-1/6">College ID</th>
              <th className="px-4 py-2 text-left font-semibold w-1/4">
                Admission Letter
              </th>
              <th className="px-4 py-2 text-left font-semibold w-1/6">Action</th>
            </tr>
          </thead>
          <tbody>
            {unverifiedStudents.map((student) => (
              <tr key={student?._id} className="border-t hover:bg-[#F4F6F0]">
                <td className="px-4 py-2">
                  {student?.name || "Unknown Name"}
                </td>
                <td className="px-4 py-2">
                  {student?.studentDetails?.collegeName || "No College Name"}
                </td>
                <td className="px-4 py-2">
                  {student?.studentDetails?.collegeId || "No College ID"}
                </td>
                <td className="px-4 py-2">
                  {student?.studentDetails?.collegeAdmissionLetterURL ? (
                    <a
                      href={`http://localhost:8000${student.studentDetails.collegeAdmissionLetterURL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Admission Letter
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleVerification(student)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verified Students */}
      <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
        Verified Students
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#C0EB6A]">
            <tr>
              <th className="px-4 py-2 text-left font-semibold w-1/6">Name</th>
              <th className="px-4 py-2 text-left font-semibold w-1/4">College Name</th>
              <th className="px-4 py-2 text-left font-semibold w-1/6">College ID</th>
              <th className="px-4 py-2 text-left font-semibold w-1/4">
                Admission Letter
              </th>
              <th className="px-4 py-2 text-left font-semibold w-1/6">Action</th>
            </tr>
          </thead>
          <tbody>
            {verifiedStudents.map((student) => (
              <tr key={student?._id} className="border-t hover:bg-[#F4F6F0]">
                <td className="px-4 py-2">
                  {student?.name || "Unknown Name"}
                </td>
                <td className="px-4 py-2">
                  {student?.studentDetails?.collegeName || "No College Name"}
                </td>
                <td className="px-4 py-2">
                  {student?.studentDetails?.collegeId || "No College ID"}
                </td>
                <td className="px-4 py-2">
                  {student?.studentDetails?.collegeAdmissionLetterURL ? (
                    <a
                      href={`http://localhost:8000${student.studentDetails.collegeAdmissionLetterURL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Admission Letter
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleVerification(student)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Unverify
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

export default AdminPage;
