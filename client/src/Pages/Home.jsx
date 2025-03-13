import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Events from "./Events";
import Footer from "../Components/Footer";
import background_video from "../assets/meta_back_ground.webm";
import Founder_image from "../assets/founder.jpeg";
import Non_Existing_Image from "../assets/non_existing.png";

const Home = () => {
  const pillars = [
    {
      title: "BUILT ON SUPPORT",
      description: "We believe no one has to go it alone. Individual success is based on the support of our community.",
    },
    {
      title: "OBTAINABLE GOALS",
      description: "With the help of our professional team, each individual will set personal, obtainable goals.",
    },
    {
      title: "RECOGNIZING UNMET NEEDS",
      description: "We recognize that the community in need of assistance spans across Middle Tennessee.",
    },
    {
      title: "MAINTENANCE",
      description: "We are committed to hearing the feedback of our Metamorphosis Community, to maintain the highest form of service.",
    },
    {
      title: "SERVICE TO OTHERS",
      description: "Our founders and staff bring 40 years of direct experience that will aid in fostering a healthy, recovery support network.",
    },
    {
      title: "SET THE FOUNDATION",
      description: "Our program structure is designed to set the foundation for life-long change.",
    },
  ];

  return (
    <div className="min-h-screen font-poppins bg-white">
      <Navbar />

      <section className="relative h-[90vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        >
          <source src={background_video} type="video/mp4" />
        </video>

        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center text-white px-4 mt-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              SUPPORTIVE HOUSING FOR WOMEN
            </h1>
          </motion.div>
        </div>
      </section>

      <section id="mission" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 flex items-center justify-center"
          >
            <div className="w-24 border-t-4 border-gray-900 mx-4"></div>
            <h2 className="text-4xl font-bold text-gray-900">OUR MISSION</h2>
            <div className="w-24 border-t-4 border-gray-900 mx-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-100 p-8 rounded-xl shadow-md border-t-4 border-gray-900 "
            >
              <ul className="space-y-4 text-gray-900">
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">★</span>
                  Our mission at Metamorphosis Supportive Housing revolves around empowering women to triumph over the barriers of homelessness.
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">★</span>
                  Without the comprehensive range of services we provide, those women grappling with both substance abuse and mental health challenges would remain within this vulnerable population.
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">★</span>
                  Even post-treatment, their options for attaining stability remain scarce.
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">★</span>
                  Our goal is to offer these women a structured, secure, and nurturing environment that propels their transformation into society.
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">★</span>
                  We provide housing, case management, and referrals as needed.
                </li>
              </ul>
            </motion.div>

            <div className="hidden md:flex items-center justify-center relative">
              <div className="w-px h-full bg-gray-900"></div>
            </div>

            <div className="flex flex-col items-center space-y-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center flex flex-col items-center space-y-4"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Join us?</h3>
                <Link
                  to="/form"
                  className="inline-block border-2 border-gray-900 bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  FILL OUT PRE-SCREEN FORM
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center flex flex-col items-center space-y-4"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Help the foundation?</h3>
                <Link
                  to="/donate"
                  className="inline-block border-2 border-gray-900 bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  DONATE TO US
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="pillars" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 flex items-center justify-center"
          >
            <div className="w-24 border-t-4 border-gray-900 mx-4"></div>
            <h2 className="text-4xl font-bold text-gray-900">PILLARS OF SUCCESS</h2>
            <div className="w-24 border-t-4 border-gray-900 mx-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-100 p-8 border-t-4 border-gray-900  rounded-xl shadow-md cursor-pointer hover:shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                <p className="text-gray-900">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="leaders" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 flex items-center justify-center"
          >
            <div className="w-24 border-t-4 border-gray-900 mx-4"></div>
            <h2 className="text-4xl font-bold text-gray-900">OUR LEADERS</h2>
            <div className="w-24 border-t-4 border-gray-900 mx-4"></div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src={Founder_image}
                alt="Founder"
                className="w-40 h-40 rounded-full border-4 border-gray-900 mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900">Lynnita Carter </h3>
              <p className="text-gray-900 mt-2">Founder and CEO</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src={Non_Existing_Image}
                alt="Co-founder"
                className="w-40 h-40 rounded-full border-4 border-gray-900 mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900">Anita Wiggs</h3>
              <p className="text-gray-900 mt-2">Co-Founder</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src={Non_Existing_Image}
                alt="Co-founder"
                className="w-40 h-40 rounded-full border-4 border-gray-900 mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900">Kim Stevens</h3>
              <p className="text-gray-900 mt-2">Director</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* <Events /> */}
      <Footer />
    </div>
  );
};

export default Home;
