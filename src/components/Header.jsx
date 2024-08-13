import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white p-4 sm:p-6 md:p-8 z-10 lg:sticky lg:top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/svg.png"
              alt="Logo"
              className="h-8 sm:h-10 md:h-12 lg:h-16"
            />
          </Link>
        </div>
        <div className="text-center flex-grow">
          <h2 className="text-[#274187] text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold">
            राष्ट्रीय प्रौद्योगिकी संस्थान जमशेदपुर
          </h2>
          <h1 className="text-[#274187] text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold">
            National Institute of Technology Jamshedpur
          </h1>
        </div>
        <nav className="flex-shrink-0">
          <ul className="flex gap-4 sm:gap-5 md:gap-6 list-none m-0 p-0 text-[#274187] items-center">
            {isAuthenticated ? (
              <>
                {user.userType === "admin" && (
                  <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                    <Link
                      to="/admin"
                      className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                {user.userType === "doctor" && (
                  <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                    <Link
                      to="/doctor"
                      className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                {user.userType === "staff" && (
                  <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                    <Link
                      to="/staff"
                      className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li className="relative group">
                  <img
                    src="/icon.png"
                    alt="User"
                    className="h-5 sm:h-6 md:h-8 lg:h-10 w-5 sm:w-6 md:w-8 lg:w-10 rounded-full cursor-pointer"
                  />
                  <div className="absolute right-0 mt-2 w-32 sm:w-36 md:w-40 lg:w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <span className="block text-md text-gray-600">
                        {user.userType.charAt(0).toUpperCase() +
                          user.userType.slice(1).toLowerCase()}
                      </span>
                      <span className="block text-sm text-gray-600">
                        {user.userId}
                      </span>
                      <span className="block text-sm text-gray-600">{}</span>{" "}
                      {/* Added user type here */}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                  <Link
                    to="/"
                    className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
                  >
                    Home
                  </Link>
                </li>
                {location.pathname !== "/login" && (
                  <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                    <Link
                      to="/login"
                      className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
