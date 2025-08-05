import {
  createTransaction,
  getUserTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../models/transactionModel.js";
import { invalidateAnalyticsCache } from "../services/cacheService.js";

export const addTransaction = async (req, res) => {
  try {
    console.log("Adding transaction:", req.body);
    const transaction = await createTransaction({
      user_id: req.user.id,
      ...req.body,
    });
    console.log("Transaction created:", transaction);
    // await invalidateAnalyticsCache(req.user.id);

    res.status(201).json(transaction);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add transaction", error: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    //

    const { type, category, startDate, endDate } = req.query;
    const query = { userId: req.user.id };

    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // const transactions = await Transaction.find(query).sort({ date: -1 });
    // console.log("Fetched transactions:", transactions);
    // res.json(transactions);

    //

    const transactions = await getUserTransactions(req.user.id);
    res.status(200).json(transactions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch transactions", error: err.message });
  }
};

export const editTransaction = async (req, res) => {
  console.log("i am insefde editransactions");
  try {
    console.log(req.params.id);
    console.log(req.user.id);
    const updated = await updateTransaction(
      req.params.id,
      req.user.id,
      req.body
    );
    if (!updated)
      return res.status(404).json({ message: "Transaction not found" });

    await invalidateAnalyticsCache(req.user.id);
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update transaction", error: err.message });
  }
};

export const removeTransaction = async (req, res) => {
  try {
    const deleted = await deleteTransaction(req.params.id, req.user.id);
    if (!deleted)
      return res.status(404).json({ message: "Transaction not found" });

    await invalidateAnalyticsCache(req.user.id);

    res.status(200).json({ message: "Transaction deleted", deleted });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete transaction", error: err.message });
  }
};
