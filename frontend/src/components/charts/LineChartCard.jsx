// src/components/charts/LineChartCard.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", total: 3000 },
  { name: "Feb", total: 4500 },
  { name: "Mar", total: 4200 },
  { name: "Apr", total: 5200 },
];

const LineChartCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full md:w-full">
      <h3 className="text-lg font-semibold mb-3">Monthly Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;
