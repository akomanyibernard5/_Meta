import React, { useState } from "react";
import SocialIcon from "./Icon";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://meta-7x01.onrender.com/api/user/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, message }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 via-indigo-900 to-blue-900 text-black py-16 mt-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between mb-16 gap-12">
          <div className="mb-8 md:mb-0 md:max-w-xl">
            <h3 className="text-3xl font-semibold tracking-tight mb-6 transform transition duration-500 ease-in-out hover:scale-105 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
              Metamorphosis Supportive Housing
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              Empowering women to triumph over the barriers of homelessness through
              compassion, support, and sustainable solutions.
            </p>
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" className="h-50 mt-6" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-16 mb-8 md:mb-0">
            <div className="min-w-[160px]">
              <h4 className="font-bold text-xl mb-6 text-purple-200">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    onClick={scrollToTop}
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-in-out flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      HOME
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/form"
                    onClick={scrollToTop}
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-in-out flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      PRE SCREEN FORM
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/donate"
                    onClick={scrollToTop}
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-in-out flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      DONATE
                    </span>
                  </Link>
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
                      615-938-0958
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
              <br />
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200 text-2xl font-bold">
                Send us a message
              </h1>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex flex-col space-y-4">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="4"
                    required
                  />
                  <button
                    type="submit"
                    className="p-2 border-2 border-black bg-white text-black p-3 rounded-lg hover:text-white hover:bg-blue-200 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-8 mb-12 ">
          <SocialIcon
            href="https://www.facebook.com/groups/1583926508778235/"
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

        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Metamorphosis. All rights reserved.
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </footer>
  );
};

export default Footer;