import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const DocAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleProceedClick = (appointment) => {
    const rolePath = user.userType === "doctor" ? "/doctor" : "/admin";
    if (appointment.status === "consulted") {
      navigate(`${rolePath}/view-prescription-form`, {
        state: { form: appointment.form, userRole: user.userType },
      });
    } else {
      navigate(`${rolePath}/consulted-appointments`, { state: appointment });
    }
  };

  //   const filteredAppointments = appointments.filter((appointment) => {
  //     if (filter === "all") return true;
  //     return appointment.status === filter;
  //   });

  const handleAppointment = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/api/doc/queue");

      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        setAppointments(response.data);

        console.log("Appointment data retrieved successfully:", response.data);
        // Process the data as needed, for example:
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

  useEffect(() => {
    console.log("Current appointments:", appointments.length);
  }, [appointments]);

  return (
    <main className="p-8 font-medium mx-auto max-w-5xl">
      <h2 className="text-3xl mb-4 text-center font-semibold">
        Doctor Appointments
      </h2>
      <button className="bg-blue-700" onClick={handleAppointment}>
        Show Appointment
      </button>
      <div className="mb-4">
        <label htmlFor="filter" className="block text-lg mb-2">
          Filter:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="to be consulted">To be consulted</option>
          <option value="consulted">Consulted</option>
        </select>
      </div>
      {appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">User ID</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Relation</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment, index) => (
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
                      {appointment.status === "consulted"
                        ? "View Prescription"
                        : "Proceed"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-8 text-lg">
          There are no appointments as of now.
        </p>
      )}
    </main>
  );
};

export default DocAppointments;
