import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const Donate = () => {
  const [donationType, setDonationType] = useState("money");
  const [donationAmount, setDonationAmount] = useState("");
  const [donationDetails, setDonationDetails] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorAddress, setDonorAddress] = useState("");

  const handleDonation = async (e) => {
    e.preventDefault();

    if (donationType === "money" && (!donationAmount || donationAmount <= 0)) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    if (donationType !== "money" && !donationDetails) {
      toast.error("Please provide details about your donation.");
      return;
    }

    if (!donorName || !donorEmail || !donorPhone || !donorAddress) {
      toast.error("Please fill out all donor information fields.");
      return;
    }

    try {
      if (donationType === "money") {
        const response = await fetch("http://localhost:8000/api/payment/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: donationAmount }),
        });

        const { sessionId } = await response.json();

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (error) {
          console.error("Error redirecting to checkout:", error);
          toast.error("There was an error with your payment.");
        }
      } else {
        const donationData = {
          type: donationType,
          details: donationDetails,
          donor: {
            name: donorName,
            email: donorEmail,
            phone: donorPhone,
            address: donorAddress,
          },
        };

        const response = await fetch("http://localhost:8000/api/payment/non-monetary-donations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donationData),
        });

        if (response.ok) {
          toast.success("Thank you for your donation! We will contact you for shipping details.");
        } else {
          toast.error("There was an error processing your donation.");
        }
      }
    } catch (error) {
      console.error("Error processing donation:", error);
      toast.error("There was an error processing your donation.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-center mb-8">Make a Donation</h1>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">How Your Donation Helps</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Your donation provides safe and secure housing for women in need.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  It funds essential services like counseling, healthcare, and childcare.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Your support helps women access job training and employment programs.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Donations enable us to offer mental health and wellness programs.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Your generosity provides nutritious meals and basic necessities.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  It helps us maintain and improve our housing facilities.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Your contribution supports educational workshops and skill-building classes.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Donations allow us to provide transportation for women to work or school.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Your support helps women rebuild their lives with dignity and hope.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Donations fund legal aid services for women facing domestic violence.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Your contribution helps us provide emergency shelter for women in crisis.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  It supports community outreach programs to prevent homelessness.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  Your donation funds scholarships for women pursuing education.
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">★</span>
                  It helps us provide life skills training for long-term independence.
                </li>
              </ul>
            </div>

            <div className="hidden md:flex items-center justify-center relative before:content-['★'] before:absolute before:text-black before:text-xl before:bg-white before:px-2 before:z-10">
              <div className="w-px h-full bg-gray-300"></div>
            </div>

            <div>
              <form onSubmit={handleDonation} className="space-y-6">
                <div>
                  <label htmlFor="donationType" className="block text-lg font-medium mb-2">
                    Donation Type
                  </label>
                  <select
                    id="donationType"
                    value={donationType}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                  >
                    <option value="money">Money</option>
                    <option value="clothing">Clothing</option>
                    <option value="house-stuff">House Stuff</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {donationType === "money" && (
                  <div>
                    <label htmlFor="amount" className="block text-lg font-medium mb-2">
                      Donation Amount ($)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full p-4 border-2 border-black rounded text-lg"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                )}

                {donationType !== "money" && (
                  <div>
                    <label htmlFor="donationDetails" className="block text-lg font-medium mb-2">
                      Donation Details
                    </label>
                    <textarea
                      id="donationDetails"
                      value={donationDetails}
                      onChange={(e) => setDonationDetails(e.target.value)}
                      className="w-full p-4 border-2 border-black rounded text-lg"
                      placeholder="Describe your donation (e.g., type of clothing, house items)"
                      required
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="donorName" className="block text-lg font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="donorName"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="donorEmail" className="block text-lg font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="donorEmail"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="donorPhone" className="block text-lg font-medium mb-2">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    id="donorPhone"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="donorAddress" className="block text-lg font-medium mb-2">
                    Your Address
                  </label>
                  <textarea
                    id="donorAddress"
                    value={donorAddress}
                    onChange={(e) => setDonorAddress(e.target.value)}
                    className="w-full p-4 border-2 border-black rounded text-lg"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border-2 border-black bg-white text-black p-3 rounded-lg hover:text-white hover:bg-gray-900 transition-all duration-300 flex items-center justify-center"
                >
                  {donationType === "money" ? "Donate Now ❤️" : "Submit Donation Details ❤️"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Donate;