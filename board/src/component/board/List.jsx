import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const List = () => {
  //state
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //effect >> api 호출
  useEffect(() => {
    (async () => {
    setLoading(true);
    try {
    //  const resp = await axios.get('http://localhost:8080/api/v1/board/list');
     const resp = await axios({
      url : 'http://localhost:8080/api/v1/board/list',
      method : 'get'
      });
     
     setBoards(resp.data.dtoList);
     setError(null);
    } 
    catch (error) {
      setError(error);
    } 
    finally{
      setLoading(false);
    }
  })();

    //언마운트 시 할일
    return () => {

    };
  },[])

  if(error) {
    return <div><h1>에러발생</h1></div>;
  }

  
  if(loading) {
    return <div><h1>로딩중</h1></div>;
  }

  return (
    <div>
      <button onClick={() => navigate('/write')}>글쓰기</button>
      <ul>
        {boards.map(b => <li key={b.bno}>{b.title}</li>)}
      </ul>
    </div>
  );
}

export default List;
