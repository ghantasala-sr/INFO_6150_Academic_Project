import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { selectUser, selectToken } from "../redux/slices/authSlice";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  // Fetch bookings from the backend
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
    }
  };

  useEffect(() => {
    if (user?.role === "admin" || user?.role === "sales") {
      fetchBookings();
    }
  }, [user]);

  if (!user || (user.role !== "admin" && user.role !== "sales")) {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Bookings</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Button to Navigate to Analytics Page */}
      <button
        onClick={() => navigate("/analytics")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Analytics
      </button>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Plan Name</th>
              <th>Service Provider</th>
              <th>Price</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.userId?.name || "N/A"}</td>
                <td>{booking.userId?.email || "N/A"}</td>
                <td>{booking.planId?.planName || "N/A"}</td>
                <td>{booking.planId?.serviceProvider || "N/A"}</td>
                <td>${booking.amountPaid.toFixed(2)}</td>
                <td>{booking.status || "active"}</td>
                <td>
                  {booking.invoiceUrl ? (
                    <a
                      href={`http://localhost:8000${booking.invoiceUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Invoice
                    </a>
                  ) : (
                    "Not available"
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

export default BookingsPage;
