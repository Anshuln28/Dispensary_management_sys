import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#274187] py-4">
      <div className="container mx-auto max-w-9xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* First Column */}
          <div className="flex flex-col items-center sm:items-start p-2">
            <a href="/" className="inline-block mb-2">
              <img
                className="h-10 sm:h-8 md:h-20 transition-transform duration-300 ease-in-out hover:scale-110"
                alt="logo"
                src="/svg.png"
              />
            </a>
            <p className="text-white text-sm sm:text-base md:text-xl font-bold text-center sm:text-left">
              National Institute of Technology, Jamshedpur
            </p>
            <div className="text-white flex items-center justify-center sm:justify-start my-2 transition-transform duration-300 ease-in-out hover:scale-110">
              <img
                src="loc.svg"
                alt="Location Icon"
                className="h-5 sm:h-4 md:h-7 transition-transform duration-300 ease-in-out hover:scale-150 mr-2"
              />
              <a
                href="https://www.google.com/maps/place/NIT+Dispensary/@22.7784574,86.1419552,18z/data=!4m14!1m7!3m6!1s0x39f5e4daa475a5cd:0xd87b53fadcd771a1!2sNational+Institute+of+Technology,+Jamshedpur!8m2!3d22.7770174!4d86.144116!16zL20vMDh0X3Bn!3m5!1s0x39f5e4db044b80ab:0x123eebf5e011ab34!8m2!3d22.7794243!4d86.1425154!16s%2Fg%2F12611m5zy?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xs sm:text-sm md:text-sm"
              >
                Adityapur, Jamshedpur, Jharkhand 831014
              </a>
            </div>

            <div className="flex space-x-2 my-5">
              <a
                href="https://www.facebook.com/NITJamshedpurOfficial/"
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                <img
                  src="fb.svg"
                  alt="Facebook"
                  className="h-4 sm:h-5 md:h-6 transition-transform duration-300 ease-in-out hover:scale-150"
                />
              </a>
              <a
                href="https://www.instagram.com/nitjamshedpur_official/"
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                <img
                  src="insta.svg"
                  alt="Instagram"
                  className="h-4 sm:h-5 md:h-6 transition-transform duration-300 ease-in-out hover:scale-150"
                />
              </a>
              <a
                href="https://twitter.com/jamshedpur_nit"
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                <img
                  src="x.svg"
                  alt="Twitter"
                  className="h-4 sm:h-5 md:h-6 transition-transform duration-300 ease-in-out hover:scale-150"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCjiZyMKfBnK4-JYfyz1dG3A"
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                <img
                  src="yt.svg"
                  alt="YouTube"
                  className="h-4 sm:h-5 md:h-6 transition-transform duration-300 ease-in-out hover:scale-150"
                />
              </a>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-center sm:items-start p-2">
            <h4 className="text-white mb-2 text-sm sm:text-base md:text-base font-bold">
              ~Quick Links
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center sm:justify-start">
              <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                <a
                  href="/"
                  className="text-white text-xs sm:text-sm md:text-sm"
                >
                  Home
                </a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                <a
                  href="https://nitjsr.ac.in/Institute/About_NITJSR"
                  className="text-white text-xs sm:text-sm md:text-sm"
                >
                  About Us
                </a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                <a
                  href="https://sites.google.com/nitjsr.ac.in/centrallibrary/home"
                  className="text-white text-xs sm:text-sm md:text-sm"
                >
                  Library
                </a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                <a
                  href="https://nitjsr.ac.in/Recruitments"
                  className="text-white text-xs sm:text-sm md:text-sm"
                >
                  Recruitments
                </a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                <a
                  href="https://nitjsr.ac.in/Students/Student-Activities"
                  className="text-white text-xs sm:text-sm md:text-sm"
                >
                  Activities
                </a>
              </li>

              <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                <a
                  href="https://nitjsr.ac.in/Students/Anti-Ragging"
                  className="text-white text-xs sm:text-sm md:text-sm"
                >
                  Anti-Ragging
                </a>
              </li>
              <li className="transition-transform duration-300 ease-in-out hover:scale-110">
                <a
                  href="https://nitjsr.ac.in/academic/Departments"
                  className="text-white text-xs sm:text-sm md:text-sm"
                >
                  Departments
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                to="/team"
                className="inline-block p-2 border border-gray-200 text-white text-xs sm:text-sm md:text-base text-center transition-transform duration-300 ease-in-out hover:scale-110 rounded-lg"
              >
                Designed and Developed BY
              </Link>
            </div>
          </div>

          {/* Third Column */}
          <div className="flex flex-col items-center sm:items-start p-2">
            <h4 className="text-white mb-2 text-sm sm:text-base md:text-base font-bold">
              ~Contact
            </h4>
            <div className="flex flex-col items-center sm:items-start">
              <a
                href="mailto:registrar@nitjsr.ac.in"
                className="text-white flex items-center mb-2 transition-transform duration-300 ease-in-out hover:scale-110 text-xs sm:text-sm md:text-sm"
              >
                <img
                  src="mail.png"
                  alt="Mail Icon"
                  className="h-4 sm:h-5 md:h-6 transition-transform duration-300 ease-in-out hover:scale-150 mr-2"
                />
                registrar@nitjsr.ac.in
              </a>
              <a
                href="tel:+916572462737"
                className="text-white flex items-center mb-2 transition-transform duration-300 ease-in-out hover:scale-110 text-xs sm:text-sm md:text-sm"
              >
                <img
                  src="phone.svg"
                  alt="Phone Icon"
                  className="h-4 sm:h-5 md:h-6 transition-transform duration-300 ease-in-out hover:scale-150 mr-2"
                />
                +91-657-2462737
              </a>
            </div>
            <h5 className="text-white mt-3 text-sm sm:text-base md:-base font-bold">
              ~Working Hours
            </h5>
            <div className="text-white mt-1 text-center sm:text-left text-xs sm:text-sm md:text-base">
              <div>Monday - Friday</div>
              <div>09:00 AM - 05:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
