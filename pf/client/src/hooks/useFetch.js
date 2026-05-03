import { useState, useEffect } from "react";

// Custom hook que maneja loading, error y data para cualquier fetch
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!controller.signal.aborted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
