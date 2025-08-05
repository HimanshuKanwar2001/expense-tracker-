// src/components/TransactionForm.jsx
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const TransactionForm = ({ initialData, onSuccess }) => {
  const { userId, role } = useAuth(); // added role here
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  const isReadOnly = role === "read-only";

  useEffect(() => {
    if (initialData) {
      setForm({
        type: initialData.type,
        amount: initialData.amount,
        category: initialData.category,
        description: initialData.description,
        date: initialData.date ? initialData.date.slice(0, 10) : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReadOnly) return; // prevent read-only users from submitting

    setLoading(true);
    try {
      const url = initialData
        ? `/transactions/${initialData.id}`
        : "/transactions";

      const method = initialData ? "put" : "post";

      const res = await axios[method](url, form);

      onSuccess?.(res.data);
    } catch (err) {
      console.error("Transaction save failed:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 ${
        isReadOnly ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      }`}
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit" : "Add"} Transaction
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
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
          required
          className="border px-4 py-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
      </div>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border px-4 py-2 rounded w-full"
      />

      <button
        type="submit"
        disabled={loading || isReadOnly}
        className={`px-6 py-2 rounded transition ${
          isReadOnly
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Transaction"
          : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
