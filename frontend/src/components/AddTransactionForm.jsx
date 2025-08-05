// src/components/AddTransactionForm.jsx
import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const AddTransactionForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "", // <-- date field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/transactions", form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Transaction added:", res.data);
      onSuccess?.(res.data); // optional callback
      setForm({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Transaction</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col md:flex-row gap-4">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        />
      </div>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border px-4 py-2 rounded w-full"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default AddTransactionForm;
