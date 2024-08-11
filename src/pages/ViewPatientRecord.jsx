import React, { useState } from 'react';
import axios from 'axios';

const ViewPatientRecord = () => {
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState('');
    const [patientRecords, setPatientRecords] = useState([]);
    const [dependents, setDependents] = useState([]);
    const [selectedDependent, setSelectedDependent] = useState('');

    const handleFetchDependents = async () => {
        try {
            const response = await axios.get(`/api/dependents/${userId}`);
            setDependents(response.data); // Assuming response.data is an array of dependents
        } catch (error) {
            console.error('Error fetching dependents:', error);
        }
    };

    const handleSearch = async () => {
        const idToSearch = userType === 'dependent' ? selectedDependent : userId;
        try {
            const response = await axios.get(`/api/patient-records/${userType}/${idToSearch}`);
            setPatientRecords(response.data); // Assuming response.data structure includes visits and prescriptions
        } catch (error) {
            console.error('Error fetching patient records:', error);
        }
    };

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
        if (userType === 'dependent') {
            setSelectedDependent('');
            setDependents([]);
        }
    };

    return (
        <main className="p-8 font-medium mx-auto max-w-5xl">
            <h2 className="text-3xl mb-4 text-center font-semibold">View Patient Records</h2>
            <div className="mb-4">
                <label htmlFor="userType" className="block text-lg mb-2">Select User Type:</label>
                <select
                    id="userType"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select User Type</option>
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                    <option value="dependent">Dependent</option>
                </select>
            </div>
            {userType && (
                <>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-lg mb-2">
                            {userType === 'dependent' ? 'Enter Employee ID:' : 'Enter User ID:'}
                        </label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={handleUserIdChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    {userType === 'dependent' && userId && (
                        <>
                            <button onClick={handleFetchDependents} className="bg-blue-900 text-white px-4 py-2 rounded mb-4">
                                Fetch Dependents
                            </button>
                            {dependents.length > 0 && (
                                <div className="mb-4">
                                    <label htmlFor="dependent" className="block text-lg mb-2">Select Dependent:</label>
                                    <select
                                        id="dependent"
                                        value={selectedDependent}
                                        onChange={(e) => setSelectedDependent(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    >
                                        <option value="">Select Dependent</option>
                                        {dependents.map(dep => (
                                            <option key={dep.id} value={dep.id}>{dep.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </>
                    )}
                    <button onClick={handleSearch} className="bg-blue-900 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </>
            )}

            {patientRecords.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-2xl mb-4">Patient Visits and Prescriptions</h3>
                    {patientRecords.map((record, index) => (
                        <div key={index} className="mb-4 border border-gray-300 p-4">
                            <h4 className="text-xl mb-2">Visit {index + 1}</h4>
                            <p><strong>Doctor:</strong> {record.doctorName}</p>
                            <p><strong>Date:</strong> {record.date}</p>
                            <p><strong>Clinical Findings:</strong> {record.clinicalFindings}</p>
                            <p><strong>Advice:</strong> {record.advice}</p>
                            <p><strong>Prescription:</strong> {record.prescription}</p>
                        </div>
                    ))}
                </div>
            )}

            {patientRecords.length === 0 && userId && (
                <p className="text-center mt-8 text-lg">No records found for User ID: {userId}</p>
            )}
        </main>
    );
};

export default ViewPatientRecord;
