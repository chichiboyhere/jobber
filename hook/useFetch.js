import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY} from '@env'

// const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": 'bec37fee89mshe354761bd6061acp132fe9jsn6a5140542e2f',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };


  // curl --request GET \
	// --url 'https://jsearch.p.rapidapi.com/search?query=Node.js%20developer%20in%20New-York%2C%20USA&page=1&num_pages=1&date_posted=all' \
	// --header 'x-rapidapi-host: jsearch.p.rapidapi.com' \
	// --header 'x-rapidapi-key: bec37fee89mshe354761bd6061acp132fe9jsn6a5140542e2f'

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
