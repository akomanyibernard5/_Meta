import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <div className="bg-white p-8 rounded-2xl  text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-gray-600"
        >
          Thank You for Your Donation!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-2 text-gray-600"
        >
          Your generosity is truly appreciated.
        </motion.p>

        <motion.button
          onClick={() => navigate("/")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-4 px-6 py-2 border-2 border-black bg-white text-black p-3 rounded-lg hover:text-white hover:bg-gray-900 transition-all"
        >
          Go to Homepage
        </motion.button>
      </div>
    </div>
  );
};

export default Success;
