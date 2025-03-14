import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import eventImage1 from '../assets/founder.jpeg';
import eventImage2 from '../assets/founder.jpeg';
import eventImage3 from '../assets/founder.jpeg';
import eventImage4 from '../assets/founder.jpeg';

const eventImages = [
  [eventImage1, eventImage2, eventImage3, eventImage4],
  [eventImage1, eventImage2, eventImage3, eventImage4],
  [eventImage1, eventImage2, eventImage3, eventImage4],
  [eventImage1, eventImage2, eventImage3, eventImage4],
];

const EventsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredImageIndexes, setHoveredImageIndexes] = useState(
    new Array(8).fill(0)
  );
  const [hoverTimers, setHoverTimers] = useState([]);

  const events = [
    {
      title: "Community Development Workshop",
      description: "Join us for an exciting event on community development and social impact.",
      images: eventImages[0],
      location: "City Center",
      time: "2:00 PM, 15th March 2025",
    },
    {
      title: "Sustainability & Environmental Workshop",
      description: "Learn about sustainability practices and ways to protect our planet.",
      images: eventImages[1],
      location: "Green Park",
      time: "10:00 AM, 18th March 2025",
    },
    {
      title: "Local Artisans Craft Fair",
      description: "Support local artists and artisans at our annual craft fair.",
      images: eventImages[2],
      location: "Downtown Square",
      time: "9:00 AM, 20th March 2025",
    },
    {
      title: "Health & Wellness Seminar",
      description: "A comprehensive seminar on health, wellness, and mental health awareness.",
      images: eventImages[3],
      location: "Main Hall",
      time: "11:00 AM, 22nd March 2025",
    },
    // ... other events
  ];

  const handleNext = () => {
    if (currentIndex < events.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const startHoverTimer = (index) => {
    const timer = setInterval(() => {
      setHoveredImageIndexes((prevIndexes) => {
        const newIndexes = [...prevIndexes];
        newIndexes[index] = (newIndexes[index] + 1) % eventImages[0].length;
        return newIndexes;
      });
    }, 1000); // Change image every 1 second

    setHoverTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      newTimers[index] = timer;
      return newTimers;
    });
  };

  const stopHoverTimer = (index) => {
    if (hoverTimers[index]) {
      clearInterval(hoverTimers[index]);
    }

    setHoveredImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = 0; // Reset to the first image when hover ends
      return newIndexes;
    });
  };

  // Get current set of 3 events to display
  const displayEvents = events.slice(currentIndex, currentIndex + 3);

  return (
    <section className="bg-white py-16 px-4 " id="events">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900">UPCOMING EVENTS</h2>
        </motion.div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous events"
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-900 text-3xl ${currentIndex === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            &lt;
          </button>

          <div className="flex justify-center space-x-8">
            {displayEvents.map((event, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-gray-100 w-[350px] h-[350px] bg-white rounded-lg overflow-hidden border border-gray-900 cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => openModal(event)}
                onMouseEnter={() => startHoverTimer(currentIndex + index)} // Start timer for this event
                onMouseLeave={() => stopHoverTimer(currentIndex + index)} // Stop timer for this event
              >
                <div className="flex flex-col h-full bg-gray-100">
                  {/* Title & Thin Line Divider */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <div className="border-t border-gray-900 my-2"></div>
                    {/* Carousel for the event */}
                    <div className="w-full h-[200px] overflow-hidden relative">
                      <img
                        src={event.images[hoveredImageIndexes[currentIndex + index]]}
                        alt={event.title}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* Bottom text */}
                  <p className="text-gray-700 text-sm text-center py-2 px-4 font-semibold">Click to get details</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={currentIndex === events.length - 3}
            aria-label="Next events"
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-900 text-3xl ${currentIndex === events.length - 3 ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-[600px] relative border border-gray-900">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
            <div className="border-t border-gray-900 my-4"></div>

            <div className="space-y-4 mb-4">
              {/* Event Details (Location & Time) */}
              <p className="text-gray-900 font-medium">Location: {selectedEvent.location}</p>
              <p className="text-gray-900 font-medium">Time: {selectedEvent.time}</p>

              <p className="text-gray-700">{selectedEvent.description}</p>

              <div className="space-x-4">
                <h3 className="font-semibold text-lg text-gray-900">Event Images</h3>
                <div className="flex space-x-4 overflow-x-auto">
                  {selectedEvent.images && selectedEvent.images.length > 0 ? (
                    selectedEvent.images.map((img, index) => (
                      <div key={index} className="w-[100px] h-[100px]">
                        <img src={img} alt="Event Image" className="w-full h-full object-cover rounded-md" />
                      </div>
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsComponent;
