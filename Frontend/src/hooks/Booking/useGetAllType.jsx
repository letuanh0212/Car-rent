import bookingAccount from "~/apis/admin/bookingAccount";
import { useEffect, useState } from "react";

export default function useGetAllType() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await bookingAccount.getAllTypes();

        setTypes(response?.data || response || []);
      } catch (err) {
        console.log("Fetch car types failed", err);

        setError(
          err?.message ||
            "Fetch car types failed"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCarTypes();
  }, []);

  return {
    types,
    loading,
    error,
  };
}