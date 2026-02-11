import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = {
                    "Content-Type": "application/json",
                    ...options.headers,
                };

                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const res = await axios.get(`${API_BASE}${url}`, {
                    ...options,
                    headers,
                });

                setData(res.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }
    }, [url, token, refreshKey]);

    const refetch = useCallback(() => {
        setRefreshKey(prev => prev + 1);
    }, []);

    return { data, loading, error, refetch };
};

export default useFetch;
