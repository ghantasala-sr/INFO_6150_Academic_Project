import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaAddressCard,
  FaUniversity,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";

const MyProfile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailVerified: false,
    phone: "",
    address: "",
    studentDetails: {
      collegeId: "",
      collegeName: "",
      graduationDate: {
        month: "",
        year: "",
      },
      homeAddress: "",
      degreeType: "",
      alreadyEnrolledPlan: {
        isEnrolled: false,
        details: {
          insuranceCompany: "",
          duration: "",
          hasPreviousClaim: false,
          previousClaimDetails: "",
        },
      },
    },
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFormData(response.data);
    } catch (err) {
      setError("Failed to fetch user details. Please try again.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user?.id]);

  const handleSendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/send-verification-email`,
        { email: formData.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message || "Verification email sent.");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send verification email."
      );
      setMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-4xl font-bold text-center text-[#485550] mb-6">
        My Profile
      </h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#485550] mb-4 flex items-center">
            <FaUserAlt className="mr-3 text-[#5aa9e6]" />
            Personal Information
          </h2>
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#485550]">Name:</p>
            <p className="text-gray-700">{formData.name}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#485550] flex items-center">
              <FaEnvelope className="mr-3 text-[#5aa9e6]" />
              Email:
            </p>
            <p className="text-gray-700">{formData.email}</p>
            {!formData.emailVerified && (
              <button
                onClick={handleSendVerificationEmail}
                className="mt-2 px-6 py-2 bg-[#F4F6F0] text-[#485550] rounded-lg hover:bg-[#C0EB6A] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out"
              >
                Verify Email
              </button>
            )}
            {formData.emailVerified && (
              <span className="text-blue-500 mt-2 inline-block">
                Email Verified
              </span>
            )}
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#485550] flex items-center">
              <FaPhoneAlt className="mr-3 text-[#5aa9e6]" />
              Phone:
            </p>
            <p className="text-gray-700">{formData.phone}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#485550] flex items-center">
              <FaAddressCard className="mr-3 text-[#5aa9e6]" />
              Address:
            </p>
            <p className="text-gray-700">{formData.address}</p>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#485550] mb-4 flex items-center">
            <FaUniversity className="mr-3 text-[#5aa9e6]" />
            Student Details
          </h2>
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#485550] flex items-center">
              <FaIdCard className="mr-3 text-[#5aa9e6]" />
              College ID:
            </p>
            <p className="text-gray-700">{formData.studentDetails.collegeId}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#485550] flex items-center">
              <FaUniversity className="mr-3 text-[#5aa9e6]" />
              College Name:
            </p>
            <p className="text-gray-700">
              {formData.studentDetails.collegeName}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#485550] flex items-center">
              <FaCalendarAlt className="mr-3 text-[#5aa9e6]" />
              Graduation Date:
            </p>
            <p className="text-gray-700">
              {formData.studentDetails.graduationDate.month}{" "}
              {formData.studentDetails.graduationDate.year}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#485550] flex items-center">
              <FaIdCard className="mr-3 text-[#5aa9e6]" />
              Degree Type:
            </p>
            <p className="text-gray-700">
              {formData.studentDetails.degreeType}
            </p>
          </div>

          {/* Enrolled Plan Details */}
          {formData.studentDetails.alreadyEnrolledPlan.isEnrolled && (
            <div className="mt-6 bg-[#F4F6F0] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#485550] flex items-center">
                <FaIdCard className="mr-3 text-[#5aa9e6]" />
                Enrolled Plan
              </h3>
              <div className="mt-4">
                <p className="text-lg font-semibold text-[#485550]">
                  Insurance Company:
                </p>
                <p className="text-gray-700">
                  {
                    formData.studentDetails.alreadyEnrolledPlan.details
                      .insuranceCompany
                  }
                </p>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-[#485550]">
                  Duration:
                </p>
                <p className="text-gray-700">
                  {formData.studentDetails.alreadyEnrolledPlan.details.duration}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-[#485550]">
                  Previous Claims:
                </p>
                <p className="text-gray-700">
                  {formData.studentDetails.alreadyEnrolledPlan.details
                    .hasPreviousClaim
                    ? "Yes"
                    : "No"}
                </p>
                {formData.studentDetails.alreadyEnrolledPlan.details
                  .hasPreviousClaim && (
                  <p className="text-gray-700 mt-2">
                    <strong>Claim Details:</strong>{" "}
                    {
                      formData.studentDetails.alreadyEnrolledPlan.details
                        .previousClaimDetails
                    }
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
