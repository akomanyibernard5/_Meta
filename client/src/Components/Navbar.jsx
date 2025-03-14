import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const smoothScroll = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/"); 
      setTimeout(() => {
        smoothScroll("mission");
      }, 100);
    } else {
      smoothScroll("mission");
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/"); 
      setTimeout(() => {
        smoothScroll("contact");
      }, 100);
    } else {
      smoothScroll("contact");
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg border-b border-gray-700 md:fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="group cursor-pointer">
            <img
              src={logo}
              alt="Metamorphosis Logo"
              className="h-12 w-auto mr-4 transition-transform transform group-hover:scale-105 object-contain"
            />
          </Link>
        </div>

        {/* Menu items for small screens - Display only Donate and Apply horizontally */}
        <ul className="md:hidden flex items-center space-x-8 w-full p-4 z-50">
          <li>
            <Link
              to="/donate"
              className="text-white text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">
                DONATE
              </span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </Link>
          </li>
          <li>
            <Link
              to="/form"
              className="text-white text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">
                APPLY
              </span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </Link>
          </li>
        </ul>

        {/* Menu items for larger screens - Keep the same horizontal layout with hover effect */}
        <ul className="md:flex md:items-center md:space-x-8 space-y-4 md:space-y-0 hidden md:block">
          <li>
            <Link
              to="/form"
              className="text-white text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">
                <span className="md:hidden">FORM</span>
                <span className="hidden md:inline">PRE-SCREEN FORM</span>
              </span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </Link>
          </li>
          <li>
            <Link
              to="/donate"
              className="text-white text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">
                <span className="md:hidden">DONATE</span>
                <span className="hidden md:inline">DONATE</span>
              </span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </Link>
          </li>
          <li>
            <Link
              to="/mission"
              onClick={handleAboutClick}
              className="text-white text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">
                <span className="md:hidden">ABOUT</span>
                <span className="hidden md:inline">ABOUT US</span>
              </span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={handleContactClick}
              className="text-white text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">
                <span className="md:hidden">CONTACT</span>
                <span className="hidden md:inline">CONTACT US</span>
              </span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
