import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard = () => {

  const {email, token, logout} = useAuth();
  
  //얘들도 이제...컨텍스트로 관리
  // const [email, setEmail] = useState(localStorage.getItem('email'));
  // const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // 이거 왜 오류냐~?ㅠ
  // setEmail(localStorage.getItem("email"));
  // setToken(localStorage.getItem("token"));


  // 이걸 이제 전역데이터로 관리하겟다는 뜻^^;;;;;;;? 코드가 확 짧아짐.
  // const handleLogout = (e) => {
  //   e.preventDefault(); 
  //   //storage에 쓸수 있는건 setItem, getItem, removeItem밖에 없음
  //   localStorage.removeItem("email");
  //   localStorage.removeItem("token");
  //   setEmail('guest');
  //   setToken('');
  // }

  const handleLogin = e => {
    e.preventDefault(); 
    // setItems,get Item , removeItem
    navigate("/")
  }

  return (
    <div>
      <h1>시작페이지</h1>
      <p>{email || 'guest'}</p>
      <p>{token}</p>
      {/* {email && token? <><button onClick={handleLogout}>로그아웃</button><Link to={'/list'}>게시글</Link></> : <Link to={'/'}>로그인</Link>} */}
      {email && token ? <><button onClick={logout}>로그아웃</button><Link to={'/list'}>게시글</Link></>: <button onClick={handleLogin}>로그인</button>}
    </div>
  );
}

export default Dashboard;
