import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaAddressCard, FaHeartbeat, FaPhoneAlt, FaBriefcase, FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Form = () => {
  const navigate = useNavigate();
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    Email: "",
    socialSecurityNo: "",
    referringAgency: "",
    treatmentCenter: "",
    driversLicenseNo: "",
    stateIssued: "",
    lastResidence: "",
    maritalStatus: "",
    numberOfChildren: "",
    nextOfKin: "",
    nextOfKinAddress: "",
    nextOfKinPhone: "",
    emergencyContact: "",
    emergencyContactAddress: "",
    emergencyContactPhone: "",
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
    currentPendingCharges: "",
    pastConvictions: "",
    probationParole: "",
    probationOfficerName: "",
    probationOfficerPhone: "",
    lastCompanyName: "",
    lastCompanyAddress: "",
    employmentFrom: "",
    employmentTo: "",
    reasonForLeaving: "",
    numberOfJobsInLastFiveYears: "",
    futureEmploymentPlans: "",
    jobSkills: "",
    numberOfSchoolsAttended: "",
    schoolPlace: "",
    schoolYear: "",
    lastGradeCompleted: "",
    collegeTradeSchoolDegree: "",
    servedInMilitary: "",
    militaryYears: "",
    militaryBranch: "",
    typeOfDischarge: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [lastResidenceSuggestions, setLastResidenceSuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [nextOfKinAddressSuggestions, setNextOfKinAddressSuggestions] = useState([]);
  const [emergencyContactAddressSuggestions, setEmergencyContactAddressSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const educationLevels = [
    "High School Diploma",
    "GED",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
    "Trade School Certificate",
    "Other",
  ];

  const militaryBranches = [
    "Army",
    "Navy",
    "Air Force",
    "Marines",
    "Coast Guard",
    "National Guard",
    "Reserves",
  ];

  const dischargeTypes = [
    "Honorable",
    "General (Under Honorable Conditions)",
    "Other Than Honorable",
    "Bad Conduct",
    "Dishonorable",
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    }
  }, []);

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.firstName) {
        newErrors.firstName = "First name is required.";
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required.";
      }
      if (!formData.Email) {
        newErrors.Email = "Email name is required.";
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
      if (!formData.emergencyContact) {
        newErrors.emergencyContact = "Emergency Contact is required.";
      }
      if (!formData.emergencyContactAddress) {
        newErrors.emergencyContactAddress = "Emergency Contact Address is required.";
      }
      if (!formData.emergencyContactPhone) {
        newErrors.emergencyContactPhone = "Emergency Contact Phone No. is required.";
      } else if (!/^\d{10}$/.test(formData.emergencyContactPhone.replace(/\D/g, ''))) {
        newErrors.emergencyContactPhone = "Phone No. must be 10 digits.";
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

    // Prepare the payload
    const payload = {
      ...formData,
      numberOfChildren: parseInt(formData.numberOfChildren, 10),
      nextOfKinPhone: formData.nextOfKinPhone.replace(/\D/g, ''),
      emergencyContactPhone: formData.emergencyContactPhone.replace(/\D/g, ''),
      probationOfficerPhone: formData.probationOfficerPhone.replace(/\D/g, ''),
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await axios.post("https://meta-uv20.onrender.com/api/user/create-user", payload);
      toast.success("Data submitted successfully!", { autoClose: 6000 });
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      console.error("Error submitting data:", error.response?.data);
      toast.error(`Error submitting data: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, [name]: cleanedValue });
  };

  const handleSSNChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, '').slice(0, 9);
    setFormData({ ...formData, [name]: cleanedValue });
  };

  const handleAddressChange = async (e, setSuggestions) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 2) {
      try {
        const params = {
          q: value,
          format: "json",
          addressdetails: 1,
          limit: 5,
        };

        if (userLocation) {
          params.lat = userLocation.lat;
          params.lon = userLocation.lon;
        }

        const response = await axios.get("https://nominatim.openstreetmap.org/search", { params });

        const suggestions = response.data.map((item) => ({
          label: item.display_name,
          value: item.display_name,
        }));

        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
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
    <div className="flex flex-col min-h-screen" id="form" >
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
                <FaUser className="mr-2" /> PERSONAL INFORMATION
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
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
                  <label className="block text-lg font-medium mb-2" htmlFor="Email">
                    Email
                  </label>
                  <input
                    type="text"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  />
                  {errors.Email && (
                    <p className="text-red-500 text-sm">{errors.Email}</p>
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
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="driversLicenseNo">
                    Driver's License No.
                  </label>
                  <input
                    type="text"
                    name="driversLicenseNo"
                    value={formData.driversLicenseNo}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  />
                </div>
                <div className="relative">
                  <label className="block text-lg font-medium mb-2" htmlFor="stateIssued">
                    State Issued
                  </label>
                  <div
                    className="w-full p-4 border-2 border-black rounded text-lg cursor-pointer"
                    onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                  >
                    {formData.stateIssued || "Select State"}
                  </div>
                  {isStateDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 border border-gray-300 rounded bg-white shadow-lg max-h-40 overflow-y-auto">
                      {usStates.map((state, index) => (
                        <div
                          key={state}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, stateIssued: state });
                            setIsStateDropdownOpen(false);
                          }}
                        >
                          {state}
                        </div>
                      ))}
                    </div>
                  )}
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
                <FaAddressCard className="mr-2" /> CONTACT INFORMATION
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-lg font-medium mb-2" htmlFor="lastResidence">
                    Last Residence
                  </label>
                  <input
                    type="text"
                    name="lastResidence"
                    value={formData.lastResidence}
                    onChange={(e) => handleAddressChange(e, setLastResidenceSuggestions)}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {lastResidenceSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full border border-gray-300 rounded mt-2 bg-white shadow-lg">
                      {lastResidenceSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, lastResidence: suggestion.label });
                            setLastResidenceSuggestions([]);
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
                    Next of Kin Full Name
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
                <div className="relative">
                  <label className="block text-lg font-medium mb-2" htmlFor="nextOfKinAddress">
                    Next of Kin Address
                  </label>
                  <input
                    type="text"
                    name="nextOfKinAddress"
                    value={formData.nextOfKinAddress}
                    onChange={(e) => handleAddressChange(e, setNextOfKinAddressSuggestions)}
                    className="w-full p-4 border-2 border-black rounded text-lg text-black"
                    required
                  />
                  {nextOfKinAddressSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full border border-gray-300 rounded mt-2 bg-white shadow-lg">
                      {nextOfKinAddressSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, nextOfKinAddress: suggestion.label });
                            setNextOfKinAddressSuggestions([]);
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
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="emergencyContact">
                    Emergency Contact Full Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                  />
                  {errors.emergencyContact && (
                    <p className="text-red-500 text-sm">{errors.emergencyContact}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-lg font-medium mb-2" htmlFor="emergencyContactAddress">
                    Emergency Contact Address
                  </label>
                  <input
                    type="text"
                    name="emergencyContactAddress"
                    value={formData.emergencyContactAddress}
                    onChange={(e) => handleAddressChange(e, setEmergencyContactAddressSuggestions)}
                    className="w-full p-4 border-2 border-black rounded text-lg text-black"
                    required
                  />
                  {emergencyContactAddressSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full border border-gray-300 rounded mt-2 bg-white shadow-lg">
                      {emergencyContactAddressSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, emergencyContactAddress: suggestion.label });
                            setEmergencyContactAddressSuggestions([]);
                          }}
                        >
                          {suggestion.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.emergencyContactAddress && (
                    <p className="text-red-500 text-sm">{errors.emergencyContactAddress}</p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="emergencyContactPhone">
                    Emergency Contact Phone No.
                  </label>
                  <input
                    type="text"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handlePhoneChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    required
                    maxLength={12}
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-red-500 text-sm">{errors.emergencyContactPhone}</p>
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
                <FaHeartbeat className="mr-2" /> MEDICAL INFORMATION
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="medicalProblems">
                    Medical Problems
                  </label>
                  <textarea
                    name="medicalProblems"
                    value={formData.medicalProblems}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="medicalMedication">
                    Medication for Medical Problems
                  </label>
                  <textarea
                    name="medicalMedication"
                    value={formData.medicalMedication}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="psychiatricDisorder">
                    Psychiatric Disorder
                  </label>
                  <textarea
                    name="psychiatricDisorder"
                    value={formData.psychiatricDisorder}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2" htmlFor="psychiatricMedication">
                    Medication for Psychiatric Disorder
                  </label>
                  <textarea
                    name="psychiatricMedication"
                    value={formData.psychiatricMedication}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    rows="3"
                  />
                </div>
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
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaBriefcase className="mr-2" /> MOST RECENT EMPLOYMENT
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="lastCompanyName">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="lastCompanyName"
                        value={formData.lastCompanyName}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="lastCompanyAddress">
                        Company Address
                      </label>
                      <input
                        type="text"
                        name="lastCompanyAddress"
                        value={formData.lastCompanyAddress}
                        onChange={(e) => handleAddressChange(e, setCompanySuggestions)}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                      />
                    </div>
                    {companySuggestions.length > 0 && (
                      <ul className="absolute z-10 w-full border border-gray-300 rounded mt-2 bg-white shadow-lg">
                        {companySuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData({ ...formData, companySuggestions: suggestion.label });
                              setCompanySuggestions([]);
                            }}
                          >
                            {suggestion.label}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="employmentFrom">
                        From (Month/Year)
                      </label>
                      <input
                        type="date"
                        name="employmentFrom"
                        value={formData.employmentFrom}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="employmentTo">
                        To (Month/Year)
                      </label>
                      <input
                        type="date"
                        name="employmentTo"
                        value={formData.employmentTo}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="reasonForLeaving">
                        Reason for Leaving
                      </label>
                      <input
                        type="text"
                        name="reasonForLeaving"
                        value={formData.reasonForLeaving}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="numberOfJobsInLastFiveYears">
                        Number of Jobs in Last 5 Years
                      </label>
                      <input
                        type="number"
                        name="numberOfJobsInLastFiveYears"
                        value={formData.numberOfJobsInLastFiveYears}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="futureEmploymentPlans">
                        Future Employment Plans
                      </label>
                      <textarea
                        name="futureEmploymentPlans"
                        value={formData.futureEmploymentPlans}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="jobSkills">
                        Job Skills
                      </label>
                      <textarea
                        name="jobSkills"
                        value={formData.jobSkills}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaGraduationCap className="mr-2" /> EDUCATION
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="numberOfSchoolsAttended">
                        Number of Schools Attended
                      </label>
                      <input
                        type="number"
                        name="numberOfSchoolsAttended"
                        value={formData.numberOfSchoolsAttended}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="schoolPlace">
                        Name of Recent School
                      </label>
                      <input
                        type="text"
                        name="schoolPlace"
                        value={formData.schoolPlace}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="schoolYear">
                        Date of Completion
                      </label>
                      <input
                        type="date"
                        name="schoolYear"
                        value={formData.schoolYear}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                        placeholder="YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2" htmlFor="lastGradeCompleted">
                        Highest Grade Completed
                      </label>
                      <select
                        name="lastGradeCompleted"
                        value={formData.lastGradeCompleted}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-black rounded text-lg"
                      >
                        <option value="">Select</option>
                        {educationLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className={`grid ${formData.servedInMilitary === "Yes" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-6`}>
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <FaShieldAlt className="mr-2" /> MILITARY INFORMATION
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg font-medium mb-2" htmlFor="servedInMilitary">
                            Have you served in the military?
                          </label>
                          <select
                            name="servedInMilitary"
                            value={formData.servedInMilitary}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-black rounded text-lg"
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {formData.servedInMilitary === "Yes" && (
                          <>
                            <div>
                              <label className="block text-lg font-medium mb-2" htmlFor="militaryYears">
                                Number of Years Served
                              </label>
                              <input
                                type="number"
                                name="militaryYears"
                                value={formData.militaryYears}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-black rounded text-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-lg font-medium mb-2" htmlFor="militaryBranch">
                                Military Branch
                              </label>
                              <select
                                name="militaryBranch"
                                value={formData.militaryBranch}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-black rounded text-lg"
                              >
                                <option value="">Select</option>
                                {militaryBranches.map((branch) => (
                                  <option key={branch} value={branch}>
                                    {branch}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-lg font-medium mb-2" htmlFor="typeOfDischarge">
                                Type of Discharge
                              </label>
                              <select
                                name="typeOfDischarge"
                                value={formData.typeOfDischarge}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-black rounded text-lg"
                              >
                                <option value="">Select</option>
                                {dischargeTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {formData.servedInMilitary !== "Yes" && (
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <FaShieldAlt className="mr-2" /> INCARCERATION HISTORY
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-lg font-medium mb-2" htmlFor="everIncarcerated">
                              Have you ever been incarcerated?
                            </label>
                            <select
                              name="everIncarcerated"
                              value={formData.everIncarcerated}
                              onChange={handleChange}
                              className="w-full p-4 border-2 border-black rounded text-lg"
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          {formData.everIncarcerated === "Yes" && (
                            <>
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
                                  placeholder="Provide details about your incarceration history"
                                />
                              </div>
                              <div>
                                <label className="block text-lg font-medium mb-2" htmlFor="currentPendingCharges">
                                  Current/Pending Charges If Any
                                </label>
                                <textarea
                                  name="currentPendingCharges"
                                  value={formData.currentPendingCharges}
                                  onChange={handleChange}
                                  className="w-full p-4 border-2 border-black rounded text-lg"
                                  rows="3"
                                  placeholder="Provide details about current or pending charges"
                                />
                              </div>
                              <div>
                                <label className="block text-lg font-medium mb-2" htmlFor="pastConvictions">
                                  Past Convictions (Last 10 Years)
                                </label>
                                <textarea
                                  name="pastConvictions"
                                  value={formData.pastConvictions}
                                  onChange={handleChange}
                                  className="w-full p-4 border-2 border-black rounded text-lg"
                                  rows="3"
                                  placeholder="Provide details about past convictions"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {formData.servedInMilitary === "Yes" && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <FaShieldAlt className="mr-2" /> INCARCERATION HISTORY
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg font-medium mb-2" htmlFor="everIncarcerated">
                            Have you ever been incarcerated?
                          </label>
                          <select
                            name="everIncarcerated"
                            value={formData.everIncarcerated}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-black rounded text-lg"
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {formData.everIncarcerated === "Yes" && (
                          <>
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
                                placeholder="Provide details about your incarceration history"
                              />
                            </div>
                            <div>
                              <label className="block text-lg font-medium mb-2" htmlFor="currentPendingCharges">
                                Current/Pending Charges If Any
                              </label>
                              <textarea
                                name="currentPendingCharges"
                                value={formData.currentPendingCharges}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-black rounded text-lg"
                                rows="3"
                                placeholder="Provide details about current or pending charges"
                              />
                            </div>
                            <div>
                              <label className="block text-lg font-medium mb-2" htmlFor="pastConvictions">
                                Past Convictions (Last 10 Years)
                              </label>
                              <textarea
                                name="pastConvictions"
                                value={formData.pastConvictions}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-black rounded text-lg"
                                rows="3"
                                placeholder="Provide details about past convictions"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-lg font-medium mb-2" htmlFor="probationParole">
                      Are you currently on Probation or Parole?
                    </label>
                    <select
                      name="probationParole"
                      value={formData.probationParole}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-black rounded text-lg"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {formData.probationParole === "Yes" && (
                    <>
                      <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="probationOfficerName">
                          Probation Officer Name
                        </label>
                        <input
                          type="text"
                          name="probationOfficerName"
                          value={formData.probationOfficerName}
                          onChange={handleChange}
                          className="w-full p-4 border-2 border-black rounded text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="probationOfficerPhone">
                          Probation Officer Phone No.
                        </label>
                        <input
                          type="text"
                          name="probationOfficerPhone"
                          value={formData.probationOfficerPhone}
                          onChange={handlePhoneChange}
                          className="w-full p-4 border-2 border-black rounded text-lg"
                          maxLength={12}
                        />
                      </div>
                    </>
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