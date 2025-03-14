import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import butterfly_1 from "../assets/butterfly_1.jpg";
import butterfly_2 from "../assets/butterfly_2.jpg";
import butterfly_3 from "../assets/butterfly_3.jpg";
import butterfly_4 from "../assets/butterfly_4.jpg";
import butterfly_5 from "../assets/butterfly_5.jpg";
import Founder_image from "../assets/founder.jpeg";
import women_4 from "../assets/women_4.jpg";
import kim from "../assets/kim.jpg";
import Anita from "../assets/Anita.jpg";

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
      title: "RECOGNIZING NEEDS",
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
    <div className="min-h-screen font-poppins bg-white" id="home">
      <Navbar />
      <div className="relative">
        <img
          src={women_4}
          alt="Metamorphosis Supportive Women"
          className="w-full h-full object-contain object-center"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
          METAMORPHOSIS SUPPORTIVE HOUSING
        </h1>
      </div>

      <div className="absolute inset-0 bg-black opacity-10"></div>
      <section id="mission" className="py-20 bg-white relative z-10 overflow-hidden">
        {/* Butterfly Images as Watermarks */}
        <img
          src={butterfly_1}
          alt="Butterfly"
          className="absolute w-32 h-32 z-0" // Removed opacity
          style={{ top: '5%', left: '2%', transform: 'rotate(-15deg)' }}
        />
        <img
          src={butterfly_2}
          alt="Butterfly"
          className="absolute w-40 h-40 z-0" // Removed opacity
          style={{ top: '15%', right: '5%', transform: 'rotate(20deg)' }}
        />
        <img
          src={butterfly_3}
          alt="Butterfly"
          className="absolute w-24 h-24 z-0" // Removed opacity
          style={{ bottom: '20%', left: '10%', transform: 'rotate(10deg)' }}
        />
        <img
          src={butterfly_4}
          alt="Butterfly"
          className="absolute w-48 h-48 z-0" // Removed opacity
          style={{ bottom: '5%', right: '10%', transform: 'rotate(-25deg)' }}
        />
        <img
          src={butterfly_5}
          alt="Butterfly"
          className="absolute w-36 h-36 z-0" // Removed opacity
          style={{ top: '35%', left: '25%', transform: 'rotate(15deg)' }}
        />

        <div className="container mx-auto px-4 relative z-10">
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
              className="bg-gray-100 p-8 rounded-xl shadow-md border-t-4 border-gray-900"
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

      <section id="pillars" className="py-20 bg-white relative z-10 overflow-hidden">
        {/* Butterfly Images as Watermarks */}
        <img
          src={butterfly_1}
          alt="Butterfly"
          className="absolute w-32 h-32 z-0" // Removed opacity
          style={{ top: '10%', left: '15%', transform: 'rotate(-10deg)' }}
        />
        <img
          src={butterfly_2}
          alt="Butterfly"
          className="absolute w-40 h-40 z-0" // Removed opacity
          style={{ top: '25%', right: '20%', transform: 'rotate(15deg)' }}
        />
        <img
          src={butterfly_3}
          alt="Butterfly"
          className="absolute w-24 h-24 z-0" // Removed opacity
          style={{ bottom: '30%', left: '5%', transform: 'rotate(5deg)' }}
        />
        <img
          src={butterfly_4}
          alt="Butterfly"
          className="absolute w-48 h-48 z-0" // Removed opacity
          style={{ bottom: '10%', right: '5%', transform: 'rotate(-20deg)' }}
        />
        <img
          src={butterfly_5}
          alt="Butterfly"
          className="absolute w-36 h-36 z-0" // Removed opacity
          style={{ top: '40%', left: '30%', transform: 'rotate(10deg)' }}
        />

        <div className="container mx-auto px-4 relative z-10">
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
                className="bg-gray-100 p-8 border-t-4 border-gray-900 rounded-xl shadow-md cursor-pointer hover:shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                <p className="text-gray-900">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="leaders" className="py-20 bg-white relative z-10 overflow-hidden">
        {/* Butterfly Images as Watermarks */}
        <img
          src={butterfly_1}
          alt="Butterfly"
          className="absolute w-32 h-32 z-0" // Removed opacity
          style={{ top: '5%', left: '5%', transform: 'rotate(-15deg)' }}
        />
        <img
          src={butterfly_2}
          alt="Butterfly"
          className="absolute w-40 h-40 z-0" 
          style={{ top: '20%', right: '10%', transform: 'rotate(20deg)' }}
        />
        <img
          src={butterfly_3}
          alt="Butterfly"
          className="absolute w-24 h-24 z-0" 
          style={{ bottom: '25%', left: '15%', transform: 'rotate(10deg)' }}
        />
        <img
          src={butterfly_4}
          alt="Butterfly"
          className="absolute w-48 h-48 z-0" 
          style={{ bottom: '5%', right: '5%', transform: 'rotate(-25deg)' }}
        />
        <img
          src={butterfly_5}
          alt="Butterfly"
          className="absolute w-36 h-36 z-0" 
          style={{ top: '35%', left: '30%', transform: 'rotate(15deg)' }}
        />

        <div className="container mx-auto px-4 relative z-10">
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
              <h3 className="text-2xl font-bold text-gray-900">Lynnita Carter</h3>
              <p className="text-gray-900 mt-2">Founder and CEO</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src={kim}
                alt="Co-founder"
                className="w-40 h-40 rounded-full border-4 border-gray-900 mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900">Kim Stevens</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src={Anita}
                alt="Co-founder"
                className="w-40 h-40 rounded-full border-4 border-gray-900 mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900">Anita Wiggs</h3>
              <p className="text-gray-900 mt-2">Co-Founder</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;