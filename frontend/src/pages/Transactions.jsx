import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import TransactionForm from "../components/TransactionForm";

const Transactions = () => {
  const { user } = useAuth();
  const role = localStorage.getItem("role"); // ✅ get role from localStorage
  const [transactions, setTransactions] = useState([]);
  const [editTxn, setEditTxn] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/transactions", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSuccess = (updatedTxn) => {
    if (editTxn) {
      setTransactions((prev) =>
        prev.map((txn) => (txn.id === updatedTxn.id ? updatedTxn : txn))
      );
    } else {
      setTransactions((prev) => [updatedTxn, ...prev]);
    }
    setEditTxn(null);
  };

  const handleEditClick = (txn) => {
    setEditTxn(txn);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirm) return;

    try {
      await axios.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setTransactions((prev) => prev.filter((txn) => txn.id !== id));
    } catch (err) {
      console.error("Failed to delete transaction:", err);
      alert("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Notice for read-only users */}
      {role === "read-only" && (
        <div className="p-4 text-yellow-800 bg-yellow-100 border-l-4 border-yellow-500 mb-4 rounded">
          <strong>Note:</strong> You are in <span className="font-semibold">read-only</span> mode.
          You can only view your transactions.
        </div>
      )}

      {/* Transaction Form */}
      {role !== "read-only" && (
        <TransactionForm initialData={editTxn} onSuccess={handleSuccess} />
      )}

      {/* Transaction Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

        {loading ? (
          <p>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse table-auto text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Date</th>
                  {role !== "read-only" && <th className="px-4 py-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 capitalize">{txn.type}</td>
                    <td className="px-4 py-2">
                      ₹{parseFloat(txn.amount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-2">{txn.category}</td>
                    <td className="px-4 py-2">{txn.description}</td>
                    <td className="px-4 py-2">
                      {new Date(txn.date || txn.created_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    {role !== "read-only" && (
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEditClick(txn)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(txn.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
