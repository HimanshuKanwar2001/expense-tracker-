// src/pages/Dashboard.jsx
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAnalytics from "../hooks/useAnalytics";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Dashboard = () => {
  const { data, loading, error, fromCache } = useAnalytics();

  if (loading) return <div className="p-4">Loading dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const { summary, trends, breakdown } = data;

  return (
    <div className="p-4 space-y-6">
      {console.log({ summary, trends, breakdown })}
      <h2 className="text-2xl font-semibold mb-2">Analytics Dashboard</h2>
      <p className="text-sm text-gray-500">
        Data Source: {fromCache ? "Redis Cache" : "Live DB"}
      </p>

      {/* Summary Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {summary.map((item) => (
          <div
            key={item.type}
            className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow"
          >
            <h3 className="text-xl font-semibold capitalize">{item.type}</h3>
            <p className="text-2xl font-bold">
              ₹{parseFloat(item.total).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Line Chart for Monthly Trends */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">
          Income & Expenses Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trends}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              name="Total"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart for Income vs Expense */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Bar View</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trends}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Category Breakdown */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={breakdown.map((item) => ({
                ...item,
                total: parseFloat(item.total),
              }))}
              dataKey="total"
              nameKey="category"
              outerRadius={100}
              label
            >
              {breakdown.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
