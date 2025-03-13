import { useState } from "react";

const users = [
  { id: 1, name: "Alice Johnson", age: 30, email: "alice@example.com", role: "Admin", militaryStatus: "Served", drugAddiction: "None", numberOfChildren: 2, dateOfBirth: "1993-05-15", drugHistory: "None", maritalStatus: "Married" },
  { id: 2, name: "Bob Smith", age: 25, email: "bob@example.com", role: "User", militaryStatus: "Not Served", drugAddiction: "Alcohol", numberOfChildren: 0, dateOfBirth: "1998-08-22", drugHistory: "Alcohol", maritalStatus: "Single" },
  { id: 3, name: "Charlie Brown", age: 35, email: "charlie@example.com", role: "Moderator", militaryStatus: "Served", drugAddiction: "Cannabis", numberOfChildren: 1, dateOfBirth: "1988-12-10", drugHistory: "Cannabis", maritalStatus: "Divorced" },
];

export default function UserPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filters, setFilters] = useState({
    age: "",
    militaryStatus: "",
    drugAddiction: "",
    numberOfChildren: "",
    dateOfBirth: "",
    drugHistory: "",
    maritalStatus: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setShowFilterPopup(false);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.age === "" || user.age === parseInt(filters.age)) &&
      (filters.militaryStatus === "" || user.militaryStatus === filters.militaryStatus) &&
      (filters.drugAddiction === "" || user.drugAddiction === filters.drugAddiction) &&
      (filters.numberOfChildren === "" || user.numberOfChildren === parseInt(filters.numberOfChildren)) &&
      (filters.dateOfBirth === "" || user.dateOfBirth === filters.dateOfBirth) &&
      (filters.drugHistory === "" || user.drugHistory === filters.drugHistory) &&
      (filters.maritalStatus === "" || user.maritalStatus === filters.maritalStatus)
    );
  });

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditableUser({ ...user });
  };

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Updated user data:", editableUser);
    alert("User details updated successfully!");
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-white-400 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">USERS LIST</h1>
        <button
          onClick={() => setShowFilterPopup(true)}
          className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
        >
          Filter
        </button>
      </div>

      {/* Filter Popup */}
      {showFilterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Filter Users</h2>
              <button
                onClick={() => setShowFilterPopup(false)}
                className="text-gray-900 hover:text-white hover:bg-gray-900 px-3 py-1 border border-gray-900 rounded"
              >
                Close
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Age</label>
                <input
                  type="number"
                  name="age"
                  value={filters.age}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Military Status</label>
                <select
                  name="militaryStatus"
                  value={filters.militaryStatus}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="Served">Served</option>
                  <option value="Not Served">Not Served</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Drug Addiction</label>
                <select
                  name="drugAddiction"
                  value={filters.drugAddiction}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="None">None</option>
                  <option value="Alcohol">Alcohol</option>
                  <option value="Cannabis">Cannabis</option>
                  <option value="Opioids">Opioids</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Number of Children</label>
                <input
                  type="number"
                  name="numberOfChildren"
                  value={filters.numberOfChildren}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={filters.dateOfBirth}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Drug History</label>
                <select
                  name="drugHistory"
                  value={filters.drugHistory}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="None">None</option>
                  <option value="Alcohol">Alcohol</option>
                  <option value="Cannabis">Cannabis</option>
                  <option value="Opioids">Opioids</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={filters.maritalStatus}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              <button
                onClick={applyFilters}
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Search by name..."
        className="p-3 border rounded-lg w-full mb-6 shadow-sm focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded-lg flex justify-between items-center bg-white shadow-md hover:bg-gray-100 transition-all cursor-pointer mb-4"
            >
              <span className="text-lg font-medium text-gray-700">{user.id}. {user.name} ({user.age} yrs)</span>
              <button
                className="border border-blue-900 bg-white text-blue-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-800  hover:text-white transition-all"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        {selectedUser && (
          <div className="p-6 border rounded-lg bg-white shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit User</h2>
            <label className="block mt-3 text-gray-700">Name:
              <input
                type="text"
                name="name"
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                value={editableUser.name}
                onChange={handleChange}
              />
            </label>
            <label className="block mt-3 text-gray-700">Email:
              <input
                type="email"
                name="email"
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                value={editableUser.email}
                onChange={handleChange}
              />
            </label>
            <label className="block mt-3 text-gray-700">Age:
              <input
                type="number"
                name="age"
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                value={editableUser.age}
                onChange={handleChange}
              />
            </label>
            <label className="block mt-3 text-gray-700">Role:
              <input
                type="text"
                name="role"
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                value={editableUser.role}
                onChange={handleChange}
              />
            </label>
            <div className="flex gap-3 mt-6">
              <button
                className="px-4 py-2 border border-blue-900 bg-white text-blue-900 rounded-lg shadow-md hover:bg-gray-800  hover:text-white transition-all"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
              <button
                className="px-4 py-2 border border-blue-900 bg-white text-blue-900 rounded-lg shadow-md hover:bg-gray-800  hover:text-white transition-all"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}