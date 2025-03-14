import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaAddressCard, FaHeartbeat, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
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
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.FirstName) {
        newErrors.FirstName = "First name is required.";
      }
      if (!formData.LastName) {
        newErrors.LastName = "Last name is required.";
      }
      if (!formData.birthDate) {
        newErrors.birthDate = "Birth Date is required.";
      }
      if (!formData.socialSecurityNo) {
        newErrors.socialSecurityNo = "Social Security No. is required.";
      } else if (!/^\d{9}$/.test(formData.socialSecurityNo)) {
        newErrors.socialSecurityNo = "Social Security No. must be 9 digits.";
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
      } else if (!/^\d{10}$/.test(formData.nextOfKinPhone.replace(/\D/g, ''))) {
        newErrors.nextOfKinPhone = "Phone No. must be 10 digits.";
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
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("https://meta-uv20.onrender.com/api/user/create-user", formData);
        toast.success("Data submitted successfully!", { autoClose: 6000 });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        toast.error("Error submitting data:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
    const formattedValue = cleanedValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSSNChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, '').slice(0, 9);
    const maskedValue = cleanedValue.replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3');
    setFormData({ ...formData, [name]: cleanedValue });
  };

  const handleAddressChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 2) {
      try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: value,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        });

        const suggestions = response.data.map((item) => ({
          label: item.display_name,
          value: item.display_name,
        }));

        setAddressSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setAddressSuggestions([]);
      }
    } else {
      setAddressSuggestions([]);
    }
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
                  <label className="block text-lg font-medium mb-2" htmlFor="FirstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  />
                  {errors.FirstName && (
                    <p className="text-red-500 text-sm">{errors.FirstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="LastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  />
                  {errors.LastName && (
                    <p className="text-red-500 text-sm">{errors.LastName}</p>
                  )}
                </div>
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
                    value={formData.socialSecurityNo.replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3')}
                    onChange={handleSSNChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                    maxLength={11}
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
                    onChange={handleAddressChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {addressSuggestions.length > 0 && (
                    <ul className="border border-gray-300 rounded mt-2 bg-white">
                      {addressSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, lastResidence: suggestion.label });
                            setAddressSuggestions([]);
                          }}
                        >
                          {suggestion.label}
                        </li>
                      ))}
                    </ul>
                  )}
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
                    onChange={handleAddressChange}
                    className="w-full p-4 border-2 border-black rounded text-lg text-black"
                    required
                  />
                  {addressSuggestions.length > 0 && (
                    <ul className="border border-gray-300 rounded mt-2 bg-white">
                      {addressSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, nextOfKinAddress: suggestion.label });
                            setAddressSuggestions([]);
                          }}
                        >
                          {suggestion.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.nextOfKinAddress && (
                    <p className="text-red-500 text-sm">{errors.nextOfKinAddress}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="nextOfKinPhone">
                    Next of Kin Phone No.
                  </label>
                  <input
                    type="text"
                    name="nextOfKinPhone"
                    value={formData.nextOfKinPhone}
                    onChange={handlePhoneChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                    maxLength={12}
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
      <ToastContainer />
    </div>
  );
};

export default Form;