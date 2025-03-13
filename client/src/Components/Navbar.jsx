import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  return (
    <nav className="bg-white text-black p-4 shadow-lg border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="group">
            <img
              src={logo}
              alt="Metamorphosis Logo"
              className="h-8 mr-4 transition-transform transform group-hover:scale-105"
            />
          </Link>
          <Link
            to="/"
            className="text-2xl font-semibold tracking-wide text-gray-900 transition-transform transform hover:scale-105"
          >
            METAMORPHOSIS
          </Link>
        </div>
        <ul className="flex space-x-8">
        <li>
            <Link
              to="/donate"
              className="text-gray-900 text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">DONATE</span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </Link>
          </li>
          <li>
            <a
              href="#mission"
              className="text-gray-900 text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">ABOUT US</span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-900 text-lg py-2 px-4 relative overflow-hidden border-b-2 border-transparent transition-all duration-300 ease-in-out group"
            >
              <span className="z-10 relative">CONTACT US</span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
