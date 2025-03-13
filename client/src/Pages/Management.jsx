import React, { useState } from 'react';
import Users from "./Users";

const CreateAdminPopup = ({ onClose, onCreateAdmin }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateAdmin({ email, fullName, password });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Create Admin</h2>
          <button
            onClick={onClose}
            className="text-gray-900 hover:text-white hover:bg-gray-900 px-3 py-1 border border-gray-900 rounded"
          >
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded text-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-900">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded text-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded text-gray-900"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateUserPopup = ({ onClose, onCreateUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    birthDate: '',
    socialSecurityNo: '',
    referringAgency: '',
    treatmentCenter: '',
    lastResidence: '',
    maritalStatus: '',
    numberOfChildren: 0,
    nextOfKin: '',
    nextOfKinAddress: '',
    nextOfKinPhone: '',
    medicalProblems: '',
    medicalMedication: '',
    psychiatricDisorder: '',
    psychiatricMedication: '',
    alcoholDrugHistory: '',
    primaryDrugsUsed: '',
    treatmentAttendance: '',
    education: '',
    militaryService: '',
    employmentHistory: '',
    incarcerationHistory: '',
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateUser(formData);
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Birth Date</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Social Security No</label>
              <input
                type="text"
                value={formData.socialSecurityNo}
                onChange={(e) => setFormData({ ...formData, socialSecurityNo: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Last Residence</label>
              <input
                type="text"
                value={formData.lastResidence}
                onChange={(e) => setFormData({ ...formData, lastResidence: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Marital Status</label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
                required
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Number of Children</label>
              <input
                type="number"
                value={formData.numberOfChildren}
                onChange={(e) => setFormData({ ...formData, numberOfChildren: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Next of Kin</label>
              <input
                type="text"
                value={formData.nextOfKin}
                onChange={(e) => setFormData({ ...formData, nextOfKin: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Medical Problems</label>
              <input
                type="text"
                value={formData.medicalProblems}
                onChange={(e) => setFormData({ ...formData, medicalProblems: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Psychiatric Disorder</label>
              <input
                type="text"
                value={formData.psychiatricDisorder}
                onChange={(e) => setFormData({ ...formData, psychiatricDisorder: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-900">Alcohol/Drug History</label>
              <input
                type="text"
                value={formData.alcoholDrugHistory}
                onChange={(e) => setFormData({ ...formData, alcoholDrugHistory: e.target.value })}
                className="w-full p-2 border rounded text-gray-900"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Create User (Step {step})</h2>
          <button
            onClick={onClose}
            className="text-gray-900 hover:text-white hover:bg-gray-900 px-3 py-1 border border-gray-900 rounded"
          >
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white disabled:opacity-50"
            >
              Previous
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const ManagementPage = () => {
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [users, setUsers] = useState([]);

  const handleCreateAdmin = (admin) => {
    setUsers([...users, { ...admin, role: 'Admin' }]);
  };

  const handleCreateUser = (user) => {
    setUsers([...users, { ...user, role: 'User' }]);
  };

  return (
    <div className="p-6">
      {/* Top Section with bg-gray-500 */}
      <div className="bg-gray-500 p-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Management Page</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateAdmin(true)}
              className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
            >
              Create Admin
            </button>
            <button
              onClick={() => setShowCreateUser(true)}
              className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded hover:bg-gray-900 hover:text-white"
            >
              Create User
            </button>
          </div>
        </div>
      </div>

      {/* Black Line Separator */}
      <div className="border-b border-black"></div>

      {/* Users Component */}
      <div className="p-6">
        <Users />
      </div>

      {/* Popups */}
      {showCreateAdmin && (
        <CreateAdminPopup
          onClose={() => setShowCreateAdmin(false)}
          onCreateAdmin={handleCreateAdmin}
        />
      )}
      {showCreateUser && (
        <CreateUserPopup
          onClose={() => setShowCreateUser(false)}
          onCreateUser={handleCreateUser}
        />
      )}
    </div>
  );
};

export default ManagementPage;