import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { User, CircleDollarSign, Calendar } from "lucide-react";

function LiveGraph() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        averageDonationPrice: "0.00",
        totalDonationsReceived: "0.00",
        dailyStats: [],
        userAgeGroups: [],
        topDonations: [],
        users: [],
        maritalStatus: [],
        numberOfChildren: [],
        educationLevel: [],
        medicalProblems: [],
        alcoholDrugHistory: [],
        militaryService: [],
      });
      
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  useEffect(() => {
    const generateRandomData = () => {
      return {
        totalUsers: Math.floor(Math.random() * 1000) + 100,
        averageDonationPrice: (Math.random() * 50 + 10).toFixed(2),
        totalDonationsReceived: (Math.random() * 50000 + 1000).toFixed(2),
        dailyStats: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i + 1}`, newUsers: Math.floor(Math.random() * 20) + 1 })),
        userAgeGroups: [
          { name: "18-24", value: Math.floor(Math.random() * 50) + 10 },
          { name: "25-34", value: Math.floor(Math.random() * 50) + 10 },
          { name: "35-44", value: Math.floor(Math.random() * 50) + 10 },
          { name: "45+", value: Math.floor(Math.random() * 50) + 10 }
        ],
        topDonations: Array.from({ length: 5 }, (_, i) => ({ user: `User ${i + 1}`, donation: Math.floor(Math.random() * 10000) + 500 })),
        users: Array.from({ length: 5 }, (_, i) => ({
          _id: i,
          name: `User ${i + 1}`,
          donationCount: Math.floor(Math.random() * 50) + 1,
          joinDate: new Date().toISOString(),
          ageGroup: "18-24"
        })),
        maritalStatus: [
          { name: "Single", value: Math.floor(Math.random() * 100) + 20 },
          { name: "Married", value: Math.floor(Math.random() * 100) + 20 },
          { name: "Divorced", value: Math.floor(Math.random() * 100) + 20 }
        ],
        numberOfChildren: Array.from({ length: 6 }, (_, i) => ({ children: i, count: Math.floor(Math.random() * 100) + 10 })),
        educationLevel: [
          { name: "High School", value: Math.floor(Math.random() * 100) + 20 },
          { name: "Bachelor's", value: Math.floor(Math.random() * 100) + 20 },
          { name: "Master's", value: Math.floor(Math.random() * 100) + 20 },
          { name: "PhD", value: Math.floor(Math.random() * 100) + 20 }
        ],
        medicalProblems: [
          { name: "Diabetes", value: Math.floor(Math.random() * 100) + 10 },
          { name: "Hypertension", value: Math.floor(Math.random() * 100) + 10 },
          { name: "Asthma", value: Math.floor(Math.random() * 100) + 10 },
          { name: "Arthritis", value: Math.floor(Math.random() * 100) + 10 }
        ],
        alcoholDrugHistory: [
          { name: "Alcohol", value: Math.floor(Math.random() * 100) + 20 },
          { name: "Tobacco", value: Math.floor(Math.random() * 100) + 20 },
          { name: "Cannabis", value: Math.floor(Math.random() * 100) + 20 },
          { name: "Opioids", value: Math.floor(Math.random() * 100) + 20 }
        ],
        militaryService: [
          { name: "Served", value: Math.floor(Math.random() * 100) + 20 },
          { name: "Not Served", value: Math.floor(Math.random() * 100) + 20 }
        ]
      };
    };
    setStats(generateRandomData());
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Section with bg-gray-500 */}
      <div className="bg-gray-500 p-6 rounded-t-lg">
        <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border rounded-lg shadow-lg col-span-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">Total Users:</h3>
                <p className="text-2xl font-semibold text-white">{stats.totalUsers}</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleDollarSign size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">Average Donation Price:</h3>
                <p className="text-2xl font-semibold text-white">${stats.averageDonationPrice}</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleDollarSign size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">Total Donations Received:</h3>
                <p className="text-2xl font-semibold text-white">${stats.totalDonationsReceived}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Black Line Separator */}
      <div className="border-b border-black"></div>

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* New Users Per Day (Last 30 Days) - Full Width */}
        <div className="p-4 border rounded-lg shadow-lg hover:cursor-pointer mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">New Users Per Day (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.dailyStats}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="newUsers" stroke="#0088FE" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Demographics Breakdown */}
        <div className="space-y-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Demographics Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg shadow-lg hover:cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Marital Status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={stats.maritalStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {stats.maritalStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 border rounded-lg shadow-lg hover:cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Number of Children</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats.numberOfChildren}>
                  <XAxis dataKey="children" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 border rounded-lg shadow-lg hover:cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Education Level</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={stats.educationLevel} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {stats.educationLevel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Health and Medical Analysis */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Health and Medical Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg shadow-lg hover:cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prevalence of Medical Problems</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats.medicalProblems}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 border rounded-lg shadow-lg hover:cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Alcohol/Drug History</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats.alcoholDrugHistory}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#AF19FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 border rounded-lg shadow-lg hover:cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Military Service</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={stats.militaryService} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {stats.militaryService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveGraph;