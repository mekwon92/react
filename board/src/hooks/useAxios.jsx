import React, { useCallback, useState } from 'react';


const BASE_URL ='http://localhost:8080/api/v1/';
const useAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useCallback(
    async(method, endpoint, body = null, addHeaders = {}) => {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios({
          method,
          url: `${BASE_URL}${endpoint}`, //endpoint는 v1/ 뒤의 board임
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
    },[]);

  return {data, loading, error, req};
}

export default useAxios;
