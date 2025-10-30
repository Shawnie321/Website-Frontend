import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Admin() {
  const [responses, setResponses] = useState([]);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Check login + fetch data
  useEffect(() => {
    if (!token) {
      // No token? Go to login page
      navigate("/login");
      return;
    }

    // Fetch analytics (protected)
    fetch(`${API_BASE}/api/auth/login`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setStats(data))
      .catch(() => navigate("/login"));

    // Fetch all responses
    fetch(`${API_BASE}/api/auth/login`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setResponses(data))
      .catch(err => console.error("Error fetching responses:", err));
  }, [token, navigate]);

  // Chart setup
  const chartData = {
    labels: ["Average", "Highest", "Lowest"],
    datasets: [
      {
        label: "Ratings",
        data: [stats.averageRating, stats.highestRating, stats.lowestRating],
        backgroundColor: ["#3b82f6", "#22c55e", "#ef4444"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Customer Satisfaction Ratings" },
    },
    scales: { y: { beginAtZero: true, max: 10 } },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <h2 className="text-2xl font-semibold text-center">Admin Dashboard</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Total Responses</h3>
          <p className="text-2xl font-bold">{stats.totalResponses}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Average Rating</h3>
          <p className="text-2xl font-bold">{stats.averageRating}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Highest Rating</h3>
          <p className="text-2xl font-bold">{stats.highestRating}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Lowest Rating</h3>
          <p className="text-2xl font-bold">{stats.lowestRating}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">All Responses</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {responses.map(r => (
              <tr key={r.id} className="text-center">
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.name || "Anonymous"}</td>
                <td className="p-2 border">{r.rating}</td>
                <td className="p-2 border">{r.comment}</td>
                <td className="p-2 border">{new Date(r.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}