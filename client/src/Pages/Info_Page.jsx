import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import women_1 from "../assets/women_1.jpg";
import butterfly_1 from "../assets/butterfly_1.jpg";
import butterfly_2 from "../assets/butterfly_2.jpg";
import butterfly_3 from "../assets/butterfly_3.jpg";
import butterfly_4 from "../assets/butterfly_4.jpg";
import butterfly_5 from "../assets/butterfly_5.jpg";

export default function WomensTreatmentProgram() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-900">
            <Navbar />
            <section
                id="mission"
                className="py-20 relative z-10 overflow-hidden text-white"
                style={{ backgroundImage: `url(${women_1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold mb-6"
                    >
                        METAMORPHOSIS SUPPORTIVE HOUSING
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-lg text-justify bg-black bg-opacity-50 p-6 rounded-lg shadow-md"
                    >
                        At Metamorphosis Supportive Housing, we recognize that every woman’s transition in life is unique.
                        No matter your economic, social, cultural, or racial background, we are here to walk with you.
                        Our custom-curated step-down program is designed to support women at different stages of their journey
                        towards stability and independence. To maintain a safe and supportive environment,
                        all participants must be sober, drug-free, and alcohol-free.
                    </motion.p>
                </div>
            </section>

            <section id="mission" className="py-20 bg-white relative z-10 overflow-hidden">
                {/* Butterfly Images as Watermarks */}
                <img
                    src={butterfly_1}
                    alt="Butterfly"
                    className="absolute w-32 h-32 z-0 hidden md:block" // Hide on smaller screens
                    style={{ top: '5%', left: '2%', transform: 'rotate(-15deg)' }}
                />
                <img
                    src={butterfly_2}
                    alt="Butterfly"
                    className="absolute w-40 h-40 z-0 hidden md:block" // Hide on smaller screens
                    style={{ top: '15%', right: '5%', transform: 'rotate(20deg)' }}
                />
                <img
                    src={butterfly_3}
                    alt="Butterfly"
                    className="absolute w-24 h-24 z-0 hidden md:block" // Hide on smaller screens
                    style={{ bottom: '20%', left: '10%', transform: 'rotate(10deg)' }}
                />
                <img
                    src={butterfly_4}
                    alt="Butterfly"
                    className="absolute w-48 h-48 z-0 hidden md:block" // Hide on smaller screens
                    style={{ bottom: '5%', right: '10%', transform: 'rotate(-25deg)' }}
                />
                <img
                    src={butterfly_5}
                    alt="Butterfly"
                    className="absolute w-36 h-36 z-0 hidden md:block" // Hide on smaller screens
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
                        <h1 className="text-4xl font-bold text-gray-900">METAMORPHOSIS SUPPORTIVE HOUSING</h1>
                        <div className="w-24 border-t-4 border-gray-900 mx-4"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-100 p-8 rounded-xl shadow-md border-t-4 border-gray-900"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 text-center underline uppercase mb-6">
                                OUR THREE-PHASE APPROACH
                            </h3>
                            <ul className="space-y-4 text-gray-900 text-justify">
                                <li className="flex items-start">
                                    <span className="text-gray-900 mr-2">★</span>
                                    <strong className="whitespace-nowrap">Restore: </strong>
                                    <span className="ml-1">Focus on stabilization, healing, and building a foundation for recovery.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gray-900 mr-2">★</span>
                                    <strong className="whitespace-nowrap">Refine: </strong>
                                    <span className="ml-1">Develop life skills, confidence, and healthy habits for long-term success.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gray-900 mr-2">★</span>
                                    <strong className="whitespace-nowrap">Reclaim: </strong>
                                    <span className="ml-1">Transition to independent living with ongoing support and community connections.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Vertical Divider */}
                        <div className="hidden md:flex items-center justify-center relative">
                            <div className="w-px h-full bg-gray-900"></div>
                        </div>

                        {/* Right Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-100 p-8 rounded-xl shadow-md border-t-4 border-gray-900"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 text-center underline uppercase mb-6">
                                WHY CHOOSE METAMORPHOSIS SUPPORTIVE HOUSING?
                            </h3>
                            <ul className="space-y-4 text-gray-900 text-justify">
                                <li className="flex items-start">
                                    <span className="text-gray-900 mr-2">★</span>
                                    <strong className="whitespace-nowrap">Women-Only Program: </strong>
                                    <span className="ml-1">A safe, supportive environment tailored to women’s unique needs.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gray-900 mr-2">★</span>
                                    <strong className="whitespace-nowrap">Holistic Care: </strong>
                                    <span className="ml-1">Addressing medical, therapeutic, spiritual, and family needs.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gray-900 mr-2">★</span>
                                    <strong className="whitespace-nowrap">Flexible Step-Down Phases: </strong>
                                    <span className="ml-1">Personalized support at every stage of recovery.</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* Button Section */}
                <div className="text-center mt-8 relative z-20"> {/* Ensure button is above butterflies */}
                    <Link to="/form-details">
                        <button className="bg-white border border-gray-900 text-gray-900 font-medium px-6 py-2 rounded-lg shadow-md hover:bg-gray-900 hover:text-white transition duration-300">
                            Fill Out Prescreen Form
                        </button>
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}