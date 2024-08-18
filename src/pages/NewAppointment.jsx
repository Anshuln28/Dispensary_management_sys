import React, { useEffect, useState } from "react";
import axios from "axios";

const NewAppointment = () => {
  const [appointmentType, setAppointmentType] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    dob: "",
    gender: "",
    contactNo: "",
    reasonForVisit: "",
    height: "",
    weight: "",
    body_temp: "",
    bp: "",
    bloodGroup: "",
    spo2: "",
    userId: "",
    relationship: "",
  });
  const [detailsFetched, setDetailsFetched] = useState(false);
  const [editVitals, setEditVitals] = useState(false);
  const [dependents, setDependents] = useState([]);
  const [selectedDependent, setSelectedDependent] = useState("");
  const [newDependent, setNewDependent] = useState(false);
  const [dependentsFetch, setDependentsFetched] = useState(false);
  const handleTypeChange = (e) => {
    const type = e.target.value;
    setAppointmentType(type);
    resetFormData();
    setDetailsFetched(false);
    setEditVitals(false);
    setSelectedDependent("");
    setNewDependent(false);
  };

  const resetFormData = () => {
    setFormData({
      id: "",
      name: "",
      dob: "",
      gender: "",
      contactNo: "",
      reasonForVisit: "",
      height: "",
      weight: "",
      body_temp: "",
      bp: "",
      bloodGroup: "",
      spo2: "",
      userId: "",
      relationship: appointmentType === "dependent" ? "dependent" : "self",
    });
  };

  const handleFetchDetails = async () => {
    try {
      const data = {
        user_id: formData.id,
        user_type: appointmentType,
      };
      const response = await axios.post("/api/staff/getinformation", data);

      if (response.status === 200) {
        const data = response.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: data.data.name,
          dob: data.data.DOB,
          gender: data.data.gender,
          contactNo: data.data.contact_no,
          userId: data.data.user_id,
          height: data.data.vitals.height || "",
          weight: data.data.vitals.weight || "",
          body_temp: data.data.vitals.body_temp || "",
          bp: data.data.vitals.bp || "",
          bloodGroup: data.data.vitals.bloodGroup || "",
          spo2: data.data.vitals.spo2 || "",
        }));
        setDetailsFetched(true);
      } else {
        console.error("Failed to fetch details");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleFetchDependents = async () => {
    try {
      const data = {
        user_id: formData.id,
      };
      console.log(data);
      const response = await axios.post("/api/staff/dependentinfo", data);
      if (response.status === 200) {
        setDependents(response.data.dep);

        console.log(dependents);
        setDependentsFetched(true);
      } else {
        console.error("Failed to fetch dependents");
      }
    } catch (error) {
      console.error("Error fetching dependents:", error);
    }
  };
  useEffect(() => {
    console.log("Current appointments:", dependents.length);
  }, [dependents]);

  const handleDependentChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setNewDependent(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: formData.id,
        relationship: dependents.relation,
      }));

      // resetFormData();
    } else {
      setNewDependent(false);
      const dependent = dependents.find((dep) => dep._id === value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: dependent.name,
        dob: dependent.DOB,
        userId: formData.id,
        relationship: dependent.relation,
        height: dependent.vitals.height || "",
        weight: dependent.vitals.weight || "",
        body_temp: dependent.vitals.body_temp || "",
        bp: dependent.vitals.bp || "",
        bloodGroup: dependent.bp || "",
        spo2: dependent.vitals.spo2 || "",
      }));
    }
    setSelectedDependent(value);
    setDetailsFetched(value !== "new");
  };

  const handleUpdateVitals = () => {
    setEditVitals(true);
  };

  const handleDependentVitals = async (e) => {
    e.preventDefault();

    const data = {
      user_id: selectedDependent,
      bp: formData.bp,
      height: formData.height,
      weight: formData.weight,
      spo2: formData.spo2,
      body_temp: formData.body_temp,
    };
    try {
      const response = await axios.put("/api/staff/dependentVitals", data);

      if (response.status === 200) {
        console.log("Vitals updated successfully:", response.data);
      } else {
        console.warn("Unexpected response:", response);
        // Handle unexpected response
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Error updating vitals:", error);

      // Optional: Provide user feedback on the error
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Server error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Failed to update vitals"}`
        );
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        alert("Network error: Please check your connection.");
      } else {
        // Something else happened while setting up the request
        console.error("Request error:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      // Toggle the edit mode or perform any final cleanup
      setEditVitals(!editVitals);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setEditVitals(false);
    const data = {
      user_id: formData.id,
      height: formData.height,
      weight: formData.weight,
      body_temp: formData.body_temp,
      bp: formData.bp,
      spo2: formData.spo2,
    };

    axios.put("/api/staff/update", data).then((response) => {
      console.log(" successfully:", response.data);
    });
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    console.log(formData);
    resetFormData();
    setDetailsFetched(false);
    setEditVitals(false);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const data = {
      user_id: formData.userId,
      purpose: formData.reasonForVisit,
    };
    axios.post("/api/v1/user/prescription", data);
    console.log("im done");
    setAppointmentType("");
  };

  return (
    <main className="p-8 font-medium">
      <h2 className="text-3xl mb-4 text-center font-semibold">
        New Appointment
      </h2>
      <form onSubmit={handleSubmits} className="max-w-md mx-auto">
        {/* starting  */}
        <div className="mb-4">
          <label htmlFor="appointmentType" className="block text-lg mb-2">
            Appointment Type:
          </label>
          <select
            id="appointmentType"
            value={appointmentType}
            onChange={handleTypeChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Appointment Type</option>
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="dependent">Dependent</option>
          </select>
        </div>

        {appointmentType && (
          <>
            {/* student type or employee type */}
            <div className="mb-4">
              <label htmlFor="id" className="block text-lg mb-2">
                {appointmentType === "student" ? "Student ID:" : "Employee ID:"}
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* fetch detail button for student and employee */}
            {!detailsFetched && appointmentType !== "dependent" && (
              <button
                type="button"
                onClick={handleFetchDetails}
                className="w-full bg-blue-900 text-white p-2 rounded"
              >
                Fetch Details
              </button>
            )}

            {appointmentType === "dependent" && !detailsFetched && (
              <div>
                {!dependentsFetch && (
                  <button
                    type="button"
                    onClick={handleFetchDependents}
                    className="w-full bg-blue-900 text-white p-2 rounded mb-4"
                  >
                    Fetch Dependents
                  </button>
                )}

                {dependents.length > 0 && (
                  <div className="mb-4">
                    <label htmlFor="dependent" className="block text-lg mb-2">
                      Select Dependent:
                    </label>
                    <select
                      id="dependent"
                      value={selectedDependent}
                      onChange={handleDependentChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select Dependent</option>
                      {dependents.map((dependent, index) => (
                        <option key={index} value={dependent._id}>
                          {dependent.name}
                        </option>
                      ))}
                      <option value="new">Not in the list</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {detailsFetched && appointmentType !== "dependent" && (
              <>
                <div className="mt-4 border border-gray-300 p-4">
                  <h3 className="text-xl mb-2">Patient Details</h3>
                  <p>
                    <strong>User ID:</strong> {formData.userId}
                  </p>
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {formData.dob}
                  </p>
                  <p>
                    <strong>Gender:</strong> {formData.gender}
                  </p>
                  <p>
                    <strong>Contact No.:</strong> {formData.contactNo}
                  </p>
                  <p>
                    <strong>Relationship:</strong> {formData.relationship}
                  </p>
                </div>

                <div className="mt-4 border border-gray-300 p-4">
                  <h3 className="text-xl mb-2">Reason for Visit</h3>
                  <textarea
                    id="reasonForVisit"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reasonForVisit: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                {/* vitals for employee and student */}
                <div className="mt-4 border border-gray-300 p-4">
                  <h3 className="text-xl mb-2">Vitals</h3>
                  {editVitals ? (
                    <div>
                      <div className="mb-4">
                        <label htmlFor="height" className="block text-lg mb-2">
                          Height:
                        </label>
                        <input
                          type="text"
                          id="height"
                          name="height"
                          value={formData.height}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              height: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="weight" className="block text-lg mb-2">
                          Weight:
                        </label>
                        <input
                          type="text"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              weight: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="body_temp"
                          className="block text-lg mb-2"
                        >
                          Body Temperature:
                        </label>
                        <input
                          type="text"
                          id="body_temp"
                          name="body_temp"
                          value={formData.body_temp}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              body_temp: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="bp" className="block text-lg mb-2">
                          Blood Pressure:
                        </label>
                        <input
                          type="text"
                          id="bp"
                          name="bp"
                          value={formData.bp}
                          onChange={(e) =>
                            setFormData({ ...formData, bp: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="bloodGroup"
                          className="block text-lg mb-2"
                        >
                          Blood Group:
                        </label>
                        <input
                          type="text"
                          id="bloodGroup"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bloodGroup: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="spo2" className="block text-lg mb-2">
                          SpO2:
                        </label>
                        <input
                          type="text"
                          id="spo2"
                          name="spo2"
                          value={formData.spo2}
                          onChange={(e) =>
                            setFormData({ ...formData, spo2: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="w-full bg-blue-900 text-white p-2 rounded"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <strong>Height:</strong> {formData.height}
                      </p>
                      <p>
                        <strong>Weight:</strong> {formData.weight}
                      </p>
                      <p>
                        <strong>Body Temperature:</strong> {formData.body_temp}
                      </p>
                      <p>
                        <strong>Blood Pressure:</strong> {formData.bp}
                      </p>
                      <p>
                        <strong>Blood Group:</strong> {formData.bloodGroup}
                      </p>
                      <p>
                        <strong>SpO2:</strong> {formData.spo2}
                      </p>
                      <button
                        type="button"
                        onClick={handleUpdateVitals}
                        className="w-full bg-blue-900 text-white p-2 rounded"
                      >
                        Update Vitals
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={handlesubmit}
                  className="w-full bg-green-500 text-white p-2 rounded mt-4"
                >
                  Submit
                </button>
              </>
            )}
            {/* dependent */}
            {appointmentType === "dependent" && detailsFetched && (
              <>
                <div className="mt-4 border border-gray-300 p-4">
                  <h3 className="text-xl mb-2">Patient Details</h3>
                  <p>
                    <strong>User ID:</strong> {formData.userId}
                  </p>
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {formData.dob}
                  </p>
                  <p>
                    <strong>Gender:</strong> {formData.gender}
                  </p>
                  <p>
                    <strong>Contact No.:</strong> {formData.contactNo}
                  </p>
                  <p>
                    <strong>Relationship:</strong> {formData.relationship}
                  </p>
                </div>

                <div className="mt-4 border border-gray-300 p-4">
                  <h3 className="text-xl mb-2">Reason for Visit</h3>
                  <textarea
                    id="reasonForVisit"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reasonForVisit: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mt-4 border border-gray-300 p-4">
                  <h3 className="text-xl mb-2">Vitals</h3>
                  {editVitals ? (
                    <div>
                      {/* height */}
                      <div className="mb-4">
                        <label htmlFor="height" className="block text-lg mb-2">
                          Height:
                        </label>
                        <input
                          type="text"
                          id="height"
                          name="height"
                          value={formData.height}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              height: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      {/* weight */}
                      <div className="mb-4">
                        <label htmlFor="weight" className="block text-lg mb-2">
                          Weight:
                        </label>
                        <input
                          type="text"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              weight: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      {/* body_temp */}
                      <div className="mb-4">
                        <label
                          htmlFor="body_temp"
                          className="block text-lg mb-2"
                        >
                          Body Temperature:
                        </label>
                        <input
                          type="text"
                          id="body_temp"
                          name="body_temp"
                          value={formData.body_temp}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              body_temp: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      {/* bp */}
                      <div className="mb-4">
                        <label htmlFor="bp" className="block text-lg mb-2">
                          Blood Pressure:
                        </label>
                        <input
                          type="text"
                          id="bp"
                          name="bp"
                          value={formData.bp}
                          onChange={(e) =>
                            setFormData({ ...formData, bp: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      {/* blood group */}
                      <div className="mb-4">
                        <label
                          htmlFor="bloodGroup"
                          className="block text-lg mb-2"
                        >
                          Blood Group:
                        </label>
                        <input
                          type="text"
                          id="bloodGroup"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bloodGroup: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      {/* spo2 */}
                      <div className="mb-4">
                        <label htmlFor="spo2" className="block text-lg mb-2">
                          SpO2:
                        </label>
                        <input
                          type="text"
                          id="spo2"
                          name="spo2"
                          value={formData.spo2}
                          onChange={(e) =>
                            setFormData({ ...formData, spo2: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleDependentVitals}
                        className="w-full bg-blue-900 text-white p-2 rounded"
                      >
                        Save Changes dependent
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <strong>Height:</strong> {formData.height}
                      </p>
                      <p>
                        <strong>Weight:</strong> {formData.weight}
                      </p>
                      <p>
                        <strong>Body Temperature:</strong> {formData.body_temp}
                      </p>
                      <p>
                        <strong>Blood Pressure:</strong> {formData.bp}
                      </p>
                      <p>
                        <strong>Blood Group:</strong> {formData.bloodGroup}
                      </p>
                      <p>
                        <strong>SpO2:</strong> {formData.spo2}
                      </p>
                      <button
                        type="button"
                        onClick={handleUpdateVitals}
                        className="w-full bg-blue-900 text-white p-2 rounded"
                      >
                        Update Vitals dependent
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  onClick={handlesubmit}
                  className="w-full bg-green-500 text-white p-2 rounded mt-4"
                >
                  Submit
                </button>
              </>
            )}

            {newDependent && (
              <>
                <div className="mt-4 border border-gray-300 p-4">
                  {/* <h3 className="text-xl mb-2">Patient Details</h3> */}
                  <p>
                    <strong>User ID:</strong> {formData.userId}
                  </p>
                </div>

                <div className="mt-4 border border-gray-300 p-4">
                  <h3 className="text-xl mb-2">New Dependent Details</h3>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-lg mb-2">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dob" className="block text-lg mb-2">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="relationship"
                      className="block text-lg mb-2"
                    >
                      Relationship:
                    </label>
                    <input
                      type="text"
                      id="relationship"
                      name="relationship"
                      value={formData.relationship}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          relationship: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="gender" className="block text-lg mb-2">
                      Gender:
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="contactNo" className="block text-lg mb-2">
                      Contact No.:
                    </label>
                    <input
                      type="tel"
                      id="contactNo"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactNo: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <div className="mb-4">
                      <label htmlFor="height" className="block text-lg mb-2">
                        Height:
                      </label>
                      <input
                        type="text"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            height: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="weight" className="block text-lg mb-2">
                        Weight:
                      </label>
                      <input
                        type="text"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            weight: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="body_temp" className="block text-lg mb-2">
                        Body Temperature:
                      </label>
                      <input
                        type="text"
                        id="body_temp"
                        name="body_temp"
                        value={formData.body_temp}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            body_temp: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="body_temp" className="block text-lg mb-2">
                        Body Temperature:
                      </label>
                      <input
                        type="text"
                        id="body_temp"
                        name="body_temp"
                        value={formData.body_temp}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            body_temp: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="bp" className="block text-lg mb-2">
                        Blood Pressure:
                      </label>
                      <input
                        type="text"
                        id="bp"
                        name="bp"
                        value={formData.bp}
                        onChange={(e) =>
                          setFormData({ ...formData, bp: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="bloodGroup"
                        className="block text-lg mb-2"
                      >
                        Blood Group:
                      </label>
                      <input
                        type="text"
                        id="bloodGroup"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bloodGroup: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="spo2" className="block text-lg mb-2">
                        SpO2:
                      </label>
                      <input
                        type="text"
                        id="spo2"
                        name="spo2"
                        value={formData.spo2}
                        onChange={(e) =>
                          setFormData({ ...formData, spo2: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => handleDependentChange}
                      className="w-full bg-blue-900 text-white p-2 rounded mb-4"
                    >
                      Add Dependent Details
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </form>
    </main>
  );
};

export default NewAppointment;
