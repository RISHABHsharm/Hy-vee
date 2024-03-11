
import { useState } from 'react';

const useAPI = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchData = async (name) => {
      setData(null);
      setError(false);
      setLoading(true);
      try {
        const response = await fetch(`${url}?name=${name}`);
        const result = await response.json();
        if(result.error){
          throw result;
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    return { data, loading, error, fetchData };
};

export default useAPI
