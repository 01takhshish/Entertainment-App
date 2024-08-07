import { useEffect, useState } from "react";
import axios from "../Features/ApiCall.js";

// A specialized hook designed to retrieve information about the present page.

export const useInfo = (pathname) => {
  const media = pathname.split("/")[1];
  const id = pathname.split("/")[2];
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setError(false);

    const fetchData = async () => {
      try {
        const response = await axios.get(pathname);
        const data = await response.data;

        const urls = (await axios.get(`/${media}/urls/${id}`)).data;
        setIsLoading(false);
        setDetails({ ...data, urls });
      } catch (err) {
        setError(err.response.data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pathname]);
  return { details, isLoading, error };
};
