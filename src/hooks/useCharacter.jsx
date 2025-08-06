import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// ---
export default function useCharacter(url, query) {
  // ---
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //--- controller
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      console.log("effect");
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${query}`, { signal });
        setCharacters(data.results);
      } catch (error) {
        // we wont want error when we cancel the old requests
        // fetch => error.name === "AbortError"
        // axios => axios.isCancel()
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
          console.log(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    //--- clean up function
    return () => {
      controller.abort();
      // we cancel the prev requests with old queries.
      // for optimizing program we use clean up function-
      // to stop old requests from running in background
      // now just last query will run
    };
  }, [query]);

  return { isLoading, characters };
}
