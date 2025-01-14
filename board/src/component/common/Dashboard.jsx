import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  // setEmail(localStorage.getItem("email"));
  // setToken(localStorage.getItem(token));


  const handleLogout = () => {
    //storage에 쓸수 있는건 setItem, getItem, removeItem밖에 없음
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <div>
      <h1>시작페이지</h1>
      <p>{email}</p>
      <p>{token}</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default Dashboard;
