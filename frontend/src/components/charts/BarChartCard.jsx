// src/components/charts/BarChartCard.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", income: 8000, expense: 5000 },
  { name: "Feb", income: 7500, expense: 4200 },
  { name: "Mar", income: 9200, expense: 6000 },
];

const BarChartCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full md:w-1/2">
      <h3 className="text-lg font-semibold mb-3">Income vs Expense</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#4ade80" />
          <Bar dataKey="expense" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
