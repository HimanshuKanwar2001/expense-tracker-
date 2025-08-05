import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const useAnalytics = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setData(res.data);
        setFromCache(res.data.fromCache);
      } catch (err) {
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user.token]);

  return { data, loading, error, fromCache };
};

export default useAnalytics;
