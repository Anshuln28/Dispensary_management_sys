import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const DocAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleProceedClick = (appointment) => {
    const rolePath = user.userType === "doctor" ? "/doctor" : "/admin";
    navigate(`${rolePath}/consulted-appointments`, { state: appointment });
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/doc/queue");

      if (response.status === 200) {
        const toBeConsulted = response.data.filter(
          (appointment) => appointment.status === "to be consulted"
        );
        setAppointments(toBeConsulted);
        console.log("To be consulted appointments retrieved:", toBeConsulted);
      } else {
        console.error(
          "Failed to retrieve appointment data. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching appointment data:",
        error.message
      );
    }
  };

  const handleShowHideAppointments = () => {
    if (showAppointments) {
      setAppointments([]);
    } else {
      fetchAppointments();
    }
    setShowAppointments(!showAppointments);
  };

  useEffect(() => {
    console.log("Current appointments:", appointments.length);
  }, [appointments]);

  useEffect(() => {
    let interval;
    if (showAppointments) {
      interval = setInterval(() => {
        fetchAppointments();
      }, 600000); // 10 minutes in milliseconds
    }
    return () => clearInterval(interval);
  }, [showAppointments]);

  return (
    <main className="p-8 font-medium mx-auto max-w-5xl">
      <h2 className="text-3xl mb-4 text-center font-semibold">
        Doctor Appointments
      </h2>
      
      {showAppointments && (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">User ID</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">
                      {appointment.user_id.user_id}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {appointment.user_id.name}
                    </td>
                    <td className="px-4 py-2 border-b">{appointment.status}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleProceedClick(appointment)}
                        className="bg-blue-900 text-white px-4 py-2 rounded"
                      >
                        Proceed
                      </button>
                    </td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
        </div>
      )}

      {showAppointments && appointments.length === 0 && (
        <div className="text-center py-4">
          There are no appointments to be consulted.
        </div>
      )}

      <div className="flex justify-center">
        <button
          className="text-white px-4 py-2 rounded mr-4"
          style={{ backgroundColor: "#274187" }}
          onClick={handleShowHideAppointments}
        >
          {showAppointments ? "Hide Appointments" : "Show Appointments"}
        </button>
        {showAppointments && (
          <button
            className="bg-green-700 text-white px-4 py-2 rounded"
            onClick={fetchAppointments}
          >
            Refresh
          </button>
        )}
      </div>
    </main>
  );
};

export default DocAppointments;
