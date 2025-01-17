import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

const List = () => {
  const {data, loading, error, req} = useAxios();

  console.log(data);
  
  const navigate = useNavigate();

  // effect >>> api 호출
  useEffect(() => {
    req('get','notes/listall');
  },[req]);

  if(error) {
    return <div><h1>에러발생</h1></div>
  }

  
  if(loading) {
    return <div><h1>로딩중</h1></div>
  }

  return (
    <div>
    <h1>List</h1>
    <button onClick={() => navigate('/write')}>글쓰기</button>
    <ul>
      {data && data.map(b => <li key={b.num}><Link to={`/view/${b.num}`}>{b.title}</Link><span>좋아요 {b.likesCnt}</span> <span>{b.attachCnt > 0 && '■'}</span></li>)}
    </ul>
  </div>
  );
}

export default List;
