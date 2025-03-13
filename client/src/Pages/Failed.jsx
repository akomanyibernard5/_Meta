import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unsuccessful = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
        <p className="mt-2 text-gray-600">Something went wrong. Please try again.</p>
        <button 
          onClick={() => navigate('/donate')} 
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Unsuccessful;
