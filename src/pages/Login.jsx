import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Login = () => {
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/send-otp-email', 
            {
                userId,
                user_type: userType,
            }, 
            { withCredentials: true });

            if (response.status === 200) {
                alert('OTP sent to your email.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while sending the OTP.';
            alert(errorMessage);
            console.error('Error:', errorMessage);
        }
    };

    const handleOtpVerification = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/verify-otp', 
            {
                userId,
                otp,
            }, 
            { withCredentials: true });

            if (response.data.success) {
                alert("OTP verified successfully");
                setIsOtpVerified(true);
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while verifying the OTP.';
            alert(errorMessage);
            console.error('Error:', errorMessage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (forgotPassword && isOtpVerified) {
            if (newPassword !== confirmNewPassword) {
                alert("New passwords do not match");
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/api/auth/reset-pass', 
                {
                    userId,
                    newPassword,
                }, 
                { withCredentials: true });

                if (response.data.success) {
                    alert("Password reset successfully");
                    setForgotPassword(false);
                    setPassword('');
                    setOtp('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setIsOtpVerified(false);
                } else {
                    alert(`Error: ${response.data.message}`);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An error occurred while resetting the password.';
                alert(errorMessage);
                console.error('Error:', errorMessage);
            }
        } else if (!forgotPassword) {
            try {
                const response = await axios.post('http://localhost:3000/api/auth/login', 
                {
                    user_id: userId,
                    password,
                    user_type: userType,
                }, 
                { withCredentials: true });

                if (response.data.success) {
                    const userData = {
                        userType: response.data.userType,
                        userId,
                        token: response.data.token,
                    };
                    login(userData);

                    if (response.data.userType === 'admin') {
                        navigate('/admin');
                    } else if (response.data.userType === 'doctor') {
                        navigate('/doctor');
                    } else if (response.data.userType === 'staff') {
                        navigate('/staff');
                    }
                } else {
                    console.log('Login failed:', response.data.message);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An error occurred during login.';
                alert(errorMessage);
                console.error('Error:', errorMessage);
            }
        }
    };

    return (
        <main className="p-8">
            <h2 className="text-3xl mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="userType" className="block text-lg mb-2">User Type:</label>
                    <select
                        id="userType"
                        value={userType}
                        onChange={handleUserTypeChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select User Type</option>
                        <option value="admin">Admin</option>
                        <option value="doctor">Doctor</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="userId" className="block text-lg mb-2">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                {!forgotPassword && (
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-lg mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setForgotPassword(true);
                                handleSendOtp();
                            }}
                            className="text-sm text-blue-900 absolute right-0 bottom-0 mr-2 mb-1"
                        >
                            Forgot Password?
                        </button>
                    </div>
                )}
                {forgotPassword && !isOtpVerified && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-lg mb-2">OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleOtpVerification}
                            className="w-full bg-blue-900 text-white p-2 rounded"
                        >
                            Verify OTP
                        </button>
                    </>
                )}
                {isOtpVerified && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-lg mb-2">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmNewPassword" className="block text-lg mb-2">Confirm New Password:</label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded">
                            Reset Password
                        </button>
                    </>
                )}
                {!forgotPassword && (
                    <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded">
                        Login
                    </button>
                )}
            </form>
        </main>
    );
};

export default Login;
