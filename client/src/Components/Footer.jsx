import React from "react";
import SocialIcon from "./Icon";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 via-indigo-900 to-blue-900 text-black py-16 mt-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section: Company Info */}
        <div className="flex flex-col md:flex-row justify-between mb-16 gap-12">
          <div className="mb-8 md:mb-0 md:max-w-xl">
            <h3 className="text-3xl font-semibold tracking-tight mb-6 transform transition duration-500 ease-in-out hover:scale-105 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
              Metamorphosis Supportive Housing
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              Empowering women to triumph over the barriers of homelessness through
              compassion, support, and sustainable solutions.
            </p>
          </div>

          <div className="flex flex-wrap gap-16 mb-8 md:mb-0">
            <div className="min-w-[160px]">
              <h4 className="font-bold text-xl mb-6 text-purple-200">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="/"
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-in-out flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      HOME
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/form"
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-in-out flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      PRE SCREEN FORM
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/donate"
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-in-out flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      DONATE
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="min-w-[200px]">
              <h4 className="font-bold text-xl mb-6 text-purple-200">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:615-607-8554"
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-in-out flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      615-607-8554
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Lynnita@metamorphosishousing.org"
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-in-out flex items-center group break-all"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      Lynnita@metamorphosishousing.org
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center items-center space-x-8 mb-12 ">
          <SocialIcon
            href="https://facebook.com"
            icon="facebook"
            label="Facebook"
          />
          <SocialIcon
            href="https://twitter.com"
            icon="twitter"
            label="Twitter"
          />
          <SocialIcon
            href="https://instagram.com"
            icon="instagram"
            label="Instagram"
          />
        </div>

        {/* Copyright Information */}
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Metamorphosis. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
