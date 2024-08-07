import { useEffect, useState } from "react";

export const useDeboucing = (value, delay) => {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(value);
    }, delay * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);
  return debounced;
};
