import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Icon for the "3 dot" menu
import NewAppointment from "./NewAppointment";
import ConsultedAppointments from "./ConsultedAppointments";
import Inventory from "./Inventory";
import AddMedicine from "./AddMedicine";
import DeductMedicine from "./DeductMedicine";
import ChangePassword from "./ChangePassword";
import ViewPrescriptionForm from "./ViewPrescriptionForm";

const Staff = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    console.log('Sidebar state:', !sidebarOpen); // Debug log
  };

  return (
    <main className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gray-100 shadow-lg overflow-y-auto transform lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
        } lg:w-64`}
      >
        <div className={`p-4 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
          <h2 className="text-xl font-bold mb-4 text-[#274187]">Staff Panel</h2>
          <ul className="font-semibold">
            <li className="mb-2">
              <Link
                to="new-appointment"
                className="block py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                New Appointment
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="consulted-appointments"
                className="block py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Consulted Appointments
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="inventory"
                className="block py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                View Inventory
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="add-medicine"
                className="block py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Add Medicine to Inventory
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="deduct-medicine"
                className="block py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Deduct Medicine from Inventory
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="change-password"
                className="block py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Change Password
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <section
        className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-50" : "ml-0"
        } lg:ml-50`}
      >
        {/* 3 Dot Menu for Mobile */}
        <button
          className="lg:hidden text-gray-600 mb-4 focus:outline-none"
          onClick={handleSidebarToggle}
        >
          <FaBars size={24} />
        </button>

        <Routes>
          <Route path="new-appointment" element={<NewAppointment />} />
          <Route
            path="consulted-appointments"
            element={<ConsultedAppointments />}
          />
          <Route path="inventory" element={<Inventory />} />
          <Route path="add-medicine" element={<AddMedicine />} />
          <Route path="deduct-medicine" element={<DeductMedicine />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route
            path="view-prescription-form"
            element={<ViewPrescriptionForm />}
          />
        </Routes>
      </section>
    </main>
  );
};

export default Staff;
