import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

// 초기페이지 > 로그인페이지
// 로그인성공시 스토리지에 토큰, 이메일 저장
// 1) 페이지 이동 > dashboard
// 2) dashboard내에서 스토리지 내의 값을 확인(state)
// 3) 로그아웃 구현
// 4) 비 로그인 상태에서도 dashboard사용가능
//  - guest
//  - 조건부 연산을 사용해 login으로 이동할 링크 생성
//  - 로그인 시점엔 /list이동할 링크 생성

const LoginForm = () => {
// state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, error, req} = useAxios('http://localhost:8080/api/'); //비동기처리
 
  const navigate = useNavigate('dashboard');
  const {login} = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const member = {email, password};
    console.log(member); // {email: 'user100@me92100984.com', password: '1234'}
    
    try {
      const resp = await req('get',`login?email=${email}`); //useaxios설계에 맞춰 하는거임!
      resp && login(email, resp);

      // console.log(resp); // eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzY4MjQ1OTQsImV4cCI6MTczOTUwMjk5NCwic3ViIjoidXNlcjEwMEBtZTkyMTAwOTg0LmNvbSJ9.aOm1BVxmOJzUGb8Zq_ppfx8l_ioJq5FI-uPWlkTQ-a4
      // local storage(브라우저꺼졌을땐 날라감) -> 확인하는법: Dashboard.jsx
      // 1. email
      // 2. token
      // localStorage.setItem('email', email); 이걸 context로 넘긴건가..?
      // localStorage.setItem('token', resp);

      resp && navigate('/notes');

    } catch (error) {
      console.error("로그인 실패", error);
    }
  }


  return (
    
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>email :</label>
        <input type='text' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)}></input>
      </div>
      <div>
        <label htmlFor='password'>PW :</label>
        <input type='password' id='password' name='password' onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button disabled={loading}>{loading ? '로그인 중..' : '로그인'}</button>
        {/* <button>로그인</button> */}
        {error && <p style={{color:'red'}}>에러 발생 {error.message}</p>}
      </div>
    </form>
  );

}

export default LoginForm;
