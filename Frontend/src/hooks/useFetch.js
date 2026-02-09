import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                    headers["Authorization"] = `Bearer ${token}`; // Ensure Bearer scheme
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
    }, [url, token]); // Re-run if URL or token changes

    const refetch = () => {
        // Logic to re-trigger useEffect or separate function
        // For simplicity in this version, we can just rely on key changes or expose a manual fetch
    };

    return { data, loading, error };
};

export default useFetch;
