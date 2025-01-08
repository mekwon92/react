import axios from 'axios';
import React, { useCallback, useState } from 'react';


const BASE_URL ='http://localhost:8080/api/v1/';
const useAxios = (baseUrl = BASE_URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const req = useCallback(
    async(method, endpoint, body = null, addHeaders = {}) => {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios({
          method,
          url: `${baseUrl}${endpoint}`, //endpoint는 v1/ 뒤의 board임
          data: body,
          headers: {
            'Content-Type':'application/json',
            ... addHeaders
          }
        });
        setData(resp.data);
      } catch (error) {
        setError(error);        
      } finally {
        setLoading(false);
      }
    },[baseUrl]);

  return {data, loading, error, req};
}

export default useAxios;
