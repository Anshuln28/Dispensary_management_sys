import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    userId: "",
    user_type: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    otp: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/user-details', {
          withCredentials: true,
        });

        if (response.data.success) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            userId: response.data.user.user_id,
            user_type: response.data.user.user_type,
          }));
        } else {
          console.error('Error fetching user details:', response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/send-otp-email', 
        {
          userId: formData.userId,
          user_type :formData.user_type,
        }, 
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('OTP sent to your email.');
      } else {
        alert(`Failed to send OTP: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the OTP.");
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/verify-otp', 
        {
          userId: formData.userId,
          otp: formData.otp,
        }, 
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("OTP verified successfully");
        setOtpVerified(true);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while verifying the OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      let endpoint = "";
      let payload = {};

      if (!showForgotPassword) {
        // If the user is changing the password with the old password
        endpoint = "/api/auth/change-password";
        payload = {
          userId: formData.userId,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        };
      } else if (otpVerified) {
        // If the user is resetting the password after OTP verification
        endpoint = "/api/auth/reset-pass";
        payload = {
          userId: formData.userId,
          newPassword: formData.newPassword,
        };
      }

      const response = await axios.post(endpoint, payload, { withCredentials: true });

      if (response.data.success) {
        alert("Password changed successfully");
        setFormData({
          userId: formData.userId,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
          otp: "",
        });
        setShowForgotPassword(false);
        setOtpVerified(false);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing the password");
    }
  };

  return (
    <main className="p-8 font-medium">
      <h2 className="text-3xl mb-4 text-center font-semibold">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
        <div className="mb-4">
          <label htmlFor="userId" className="block text-lg mb-2">
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled
          />
        </div>

        {showForgotPassword && !otpVerified && (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-lg mb-2">
              OTP:
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="button"
              onClick={handleOtpVerification}
              className="mt-2 w-full bg-blue-900 text-white p-2 rounded"
            >
              Verify OTP
            </button>
          </div>
        )}

        {(!showForgotPassword || otpVerified) && (
          <>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-lg mb-2">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmNewPassword"
                className="block text-lg mb-2"
              >
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </>
        )}

        {!showForgotPassword && (
          <div className="mb-4 relative">
            <label htmlFor="oldPassword" className="block text-lg mb-2">
              Old Password:
            </label>
            <div className="flex items-center">
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true);
                  handleSendOtp();
                }}
                className="text-sm text-blue-900 ml-4"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        )}

        {!showForgotPassword || otpVerified ? (
          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-2 rounded"
          >
            Change Password
          </button>
        ) : null}
      </form>
    </main>
  );
};

export default ChangePassword;
