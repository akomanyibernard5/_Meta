import { useState } from "react";
import { User, Settings, BarChart, UserCircle } from "lucide-react";
import UserPage from "./Users";
import Analytics from "./LiveGraph";
import Management from "./Management";

const menuItems = [
  { name: "Users", icon: <User size={20} />, component: <UserPage /> },
  { name: "Management", icon: <Settings size={20} />, component: <Management /> },
  { name: "Analytics", icon: <BarChart size={20} />, component: <Analytics /> },
];

export default function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState(menuItems[0].component);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    password: "********",
  });

  const handleLogout = () => {
    // Add logout logic here
    alert("Logged out successfully!");
    setShowAccountPopup(false);
  };

  const handleSaveProfile = (updatedDetails) => {
    setAdminDetails(updatedDetails);
    setShowProfilePopup(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between p-4">
        <div>
          <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-gray-700 mb-4"
              onClick={() => setActiveComponent(item.component)}
            >
              {item.icon} {item.name}
            </div>
          ))}
        </div>

        {/* Account Section */}
        <div className="relative">
          <div
            className="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-gray-700 mt-6"
            onClick={() => setShowAccountPopup(!showAccountPopup)}
          >
            <UserCircle size={24} /> <span>Account</span>
          </div>

          {/* Account Popup */}
          {showAccountPopup && (
            <div className="absolute bottom-16 left-0 w-full bg-white p-4 rounded-lg shadow-lg">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowProfilePopup(true);
                    setShowAccountPopup(false);
                  }}
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeComponent}

        {/* Profile Popup */}
        {showProfilePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Admin Profile</h2>
                <button
                  onClick={() => setShowProfilePopup(false)}
                  className="text-gray-900 hover:text-white hover:bg-gray-900 px-3 py-1 border border-gray-900 rounded"
                >
                  Close
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProfile(adminDetails);
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-900">Full Name</label>
                  <input
                    type="text"
                    value={adminDetails.fullName}
                    onChange={(e) =>
                      setAdminDetails({ ...adminDetails, fullName: e.target.value })
                    }
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-900">Email</label>
                  <input
                    type="email"
                    value={adminDetails.email}
                    onChange={(e) =>
                      setAdminDetails({ ...adminDetails, email: e.target.value })
                    }
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-900">Password</label>
                  <input
                    type="password"
                    value={adminDetails.password}
                    onChange={(e) =>
                      setAdminDetails({ ...adminDetails, password: e.target.value })
                    }
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}