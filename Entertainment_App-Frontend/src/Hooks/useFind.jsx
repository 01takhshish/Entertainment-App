import { useEffect, useState } from "react";
import { useDeboucing } from "./useDeboucing";
import axios from "../Features/ApiCall";

// A personalized hook designed to retrieve search outcomes, requiring both the path and the search query as inputs.
export const useFind = (path, searchString) => {
  const mediaType =
    path.split("/")[1] === "media" ? "Movie or Tv Shows" : path.split("/")[1];

  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  const debouncedValue = useDeboucing(searchString.trim(), 0.7);

  useEffect(() => {
    setIsLoading(true);

    setError("");

    const getSearchResults = async () => {
      if (debouncedValue && debouncedValue.length >= 3) {
        try {
          const response = await axios.get(`${path}?title=${debouncedValue}`);
          setSearchResults(response.data);
          setIsLoading(false);
        } catch (err) {
          setError(err.response.data.error);
          setSearchResults([]);
          setIsLoading(false);
        }
      } else if (debouncedValue && debouncedValue.length < 3) {
        setSearchResults([]);
        setError(
          `Please Enter at least 3 characters to search for ${mediaType}`
        );

        setIsLoading(false);
      }
    };
    getSearchResults();
  }, [debouncedValue]);

  return { searchResults, isLoading, error };
};
