import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaUser, FaAddressCard, FaHeartbeat, FaPhoneAlt } from "react-icons/fa";

const Form = () => {
  const [formData, setFormData] = useState({
    birthDate: "",
    socialSecurityNo: "",
    referringAgency: "",
    treatmentCenter: "",
    lastResidence: "",
    maritalStatus: "",
    numberOfChildren: "",
    nextOfKin: "",
    nextOfKinAddress: "",
    nextOfKinPhone: "",
    medicalProblems: "",
    medicalMedication: "",
    psychiatricDisorder: "",
    psychiatricMedication: "",
    alcoholDrugHistory: "",
    primaryDrugsUsed: "",
    treatmentAttendance: "",
    education: "",
    militaryService: "",
    employmentHistory: "",
    incarcerationHistory: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.birthDate) {
        newErrors.birthDate = "Birth Date is required.";
      }
      if (!formData.socialSecurityNo) {
        newErrors.socialSecurityNo = "Social Security No. is required.";
      }
    }

    if (currentStep === 2) {
      if (!formData.lastResidence) {
        newErrors.lastResidence = "Last Residence is required.";
      }
      if (!formData.maritalStatus) {
        newErrors.maritalStatus = "Please select a marital status.";
      }
      if (!formData.numberOfChildren) {
        newErrors.numberOfChildren = "Number of children is required.";
      }
      if (!formData.nextOfKin) {
        newErrors.nextOfKin = "Next of Kin is required.";
      }
      if (!formData.nextOfKinAddress) {
        newErrors.nextOfKinAddress = "Next of Kin Address is required.";
      }
      if (!formData.nextOfKinPhone) {
        newErrors.nextOfKinPhone = "Next of Kin Phone No. is required.";
      }
    }

    if (currentStep === 3) {
      if (!formData.medicalProblems) {
        newErrors.medicalProblems = "Medical Problems are required.";
      }
      if (!formData.medicalMedication) {
        newErrors.medicalMedication = "Medication for Medical Problems is required.";
      }
      if (!formData.psychiatricDisorder) {
        newErrors.psychiatricDisorder = "Psychiatric Disorder is required.";
      }
      if (!formData.psychiatricMedication) {
        newErrors.psychiatricMedication = "Medication for Psychiatric Disorder is required.";
      }
      if (!formData.alcoholDrugHistory) {
        newErrors.alcoholDrugHistory = "Alcohol/Drug History is required.";
      }
      if (!formData.primaryDrugsUsed) {
        newErrors.primaryDrugsUsed = "Primary Drugs Used is required.";
      }
      if (!formData.treatmentAttendance) {
        newErrors.treatmentAttendance = "Treatment Attendance is required.";
      }
      if (!formData.education) {
        newErrors.education = "Education information is required.";
      }
      if (!formData.militaryService) {
        newErrors.militaryService = "Military Service information is required.";
      }
      if (!formData.employmentHistory) {
        newErrors.employmentHistory = "Employment History is required.";
      }
      if (!formData.incarcerationHistory) {
        newErrors.incarcerationHistory = "Incarceration History is required.";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep();
    setErrors(validationErrors);
      try {
        const response = await axios.post("http://localhost:8000/api/user/create-user", formData);
        alert("Data submitted successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    const validationErrors = validateStep();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-center mb-8">User Information Form</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaUser className="mr-2" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="birthDate">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {errors.birthDate && (
                    <p className="text-red-500 text-sm">{errors.birthDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="socialSecurityNo">
                    Social Security No.
                  </label>
                  <input
                    type="text"
                    name="socialSecurityNo"
                    value={formData.socialSecurityNo}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                    pattern="[0-9]{9}"
                  />
                  {errors.socialSecurityNo && (
                    <p className="text-red-500 text-sm">{errors.socialSecurityNo}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="referringAgency">
                    Referring Agency
                  </label>
                  <input
                    type="text"
                    name="referringAgency"
                    value={formData.referringAgency}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="treatmentCenter">
                    Treatment Center
                  </label>
                  <input
                    type="text"
                    name="treatmentCenter"
                    value={formData.treatmentCenter}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-white text-black p-3 border-2 border-black rounded-[5px] w-full md:w-auto hover:bg-black hover:text-white hover:border-white transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaAddressCard className="mr-2" /> Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="lastResidence">
                    Last Residence
                  </label>
                  <input
                    type="text"
                    name="lastResidence"
                    value={formData.lastResidence}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {errors.lastResidence && (
                    <p className="text-red-500 text-sm">{errors.lastResidence}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="maritalStatus">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                  {errors.maritalStatus && (
                    <p className="text-red-500 text-sm">{errors.maritalStatus}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="numberOfChildren">
                    No. of Children
                  </label>
                  <input
                    type="number"
                    name="numberOfChildren"
                    value={formData.numberOfChildren}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {errors.numberOfChildren && (
                    <p className="text-red-500 text-sm">{errors.numberOfChildren}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="nextOfKin">
                    Next of Kin
                  </label>
                  <input
                    type="text"
                    name="nextOfKin"
                    value={formData.nextOfKin}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {errors.nextOfKin && (
                    <p className="text-red-500 text-sm">{errors.nextOfKin}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="nextOfKinAddress">
                    Next of Kin Address
                  </label>
                  <input
                    type="text"
                    name="nextOfKinAddress"
                    value={formData.nextOfKinAddress}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {errors.nextOfKinAddress && (
                    <p className="text-red-500 text-sm">{errors.nextOfKinAddress}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="nextOfKinPhone">
                    Next of Kin Phone No.
                  </label>
                  <input
                    type="tel"
                    name="nextOfKinPhone"
                    value={formData.nextOfKinPhone}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {errors.nextOfKinPhone && (
                    <p className="text-red-500 text-sm">{errors.nextOfKinPhone}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-white text-black p-3 border-2 border-black rounded-[5px] w-full md:w-auto hover:bg-black hover:text-white hover:border-white transition-all duration-300 mx-2 my-2"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-white text-black p-3 border-2 border-black rounded-[5px] w-full md:w-auto hover:bg-black hover:text-white hover:border-white transition-all duration-300 mx-2 my-2"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaHeartbeat className="mr-2" /> Medical and Additional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="alcoholDrugHistory">
                    Alcohol/Drug History
                  </label>
                  <textarea
                    name="alcoholDrugHistory"
                    value={formData.alcoholDrugHistory}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="primaryDrugsUsed">
                    Primary Drugs Used
                  </label>
                  <textarea
                    name="primaryDrugsUsed"
                    value={formData.primaryDrugsUsed}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="treatmentAttendance">
                    Treatment Attendance
                  </label>
                  <textarea
                    name="treatmentAttendance"
                    value={formData.treatmentAttendance}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="education">
                    Education
                  </label>
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="militaryService">
                    Military Service
                  </label>
                  <textarea
                    name="militaryService"
                    value={formData.militaryService}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="employmentHistory">
                    Employment History
                  </label>
                  <textarea
                    name="employmentHistory"
                    value={formData.employmentHistory}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="incarcerationHistory">
                    Incarceration History
                  </label>
                  <textarea
                    name="incarcerationHistory"
                    value={formData.incarcerationHistory}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-white text-black p-3 border-2 border-black rounded-[5px] w-full md:w-auto hover:bg-black hover:text-white hover:border-white transition-all duration-300 mx-2 my-2"
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="bg-black text-white p-3 border-2 border-black rounded-[5px] w-full md:w-auto hover:bg-white hover:text-black hover:border-black transition-all duration-300 mx-2 my-2"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Form;
