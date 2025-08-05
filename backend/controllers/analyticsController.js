import {
  getIncomeExpenseSummary,
  getMonthlyTrend,
  getCategoryBreakdown,
} from "../models/analyticsModel.js";

import {
  getCachedAnalytics,
  setCachedAnalytics,
} from "../services/cacheService.js";

export const getUserAnalytics = async (req, res) => {
  const user_id = req.user.id;

  try {
    // 1. Check cache
    const cached = await getCachedAnalytics(user_id);
    console.log("Cache miss for user:", user_id, cached);
    if (cached) return res.status(200).json({ fromCache: true, ...cached });

    // 2. Fetch fresh data
    const [summary, trends, breakdown] = await Promise.all([
      getIncomeExpenseSummary(user_id),
      getMonthlyTrend(user_id),
      getCategoryBreakdown(user_id),
    ]);

    const analytics = { summary, trends, breakdown };
    console.log("analytics:", analytics);
    // 3. Cache it
    await setCachedAnalytics(user_id, analytics);

    res.status(200).json({ fromCache: false, ...analytics });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch analytics", error: err.message });
  }
};
