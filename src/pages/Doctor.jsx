import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import ViewPatientRecord from "./ViewPatientRecord";
import NewAppointment from "./NewAppointment";
import DocAppointments from "./DocAppointments";
import Inventory from "./Inventory";
import ChangePassword from "./ChangePassword";
import ViewPrescriptionForm from "./ViewPrescriptionForm";
import ConsultedAppointments from "./ConsultedAppointments";

const Doctor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gray-100 shadow-lg overflow-y-auto transform lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
        } lg:w-64`}
      >
        <div className={`p-4 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
          <h2 className="text-xl font-bold mb-4 text-[#274187]">
            Doctor Panel
          </h2>
          <ul className="font-semibold">
            <li className="mb-2">
              <Link
                to="view-patient-record"
                className="block py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                View Patient Records
              </Link>
            </li>
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
                to="doc-appointments"
                className="block py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Doctor Appointments
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
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={24} />
        </button>

        <Routes>
          <Route path="view-patient-record" element={<ViewPatientRecord />} />
          <Route path="new-appointment" element={<NewAppointment />} />
          <Route path="doc-appointments" element={<DocAppointments />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route
            path="consulted-appointments"
            element={<ConsultedAppointments />}
          />
          <Route
            path="view-prescription-form"
            element={<ViewPrescriptionForm />}
          />
        </Routes>
      </section>
    </main>
  );
};

export default Doctor;
