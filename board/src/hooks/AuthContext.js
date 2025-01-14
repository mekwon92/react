//인증 컨텍스트

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1.localStorage의 값 가져오기


// 2.login 구현

// 3.logout 구현


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  // token, email
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    // 초기화시 localStorage의 값 가져오기
    if(token && email) {
      const storedMember = localStorage.getItem('email');
      setEmail(storedMember);
    }
  }, [token, email])

  const login = (email, token) => {
    setEmail(email);
    setToken(token);

    localStorage.setItem('token', token);
    localStorage.setItem('email', email);

    // 로그인 처리 후 리디렉션
    navigate('/dashboard')
  }

  
  const logout = () => {
    setEmail(null);
    setToken(null);

    localStorage.removeItem('token');
    localStorage.removeItem('email');

    // 로그인 처리 후 리디렉션
    navigate('/dashboard')
  }
  return (
    <div>
      {/* 여기서 관리대상을 value로 관리 */}
      <AuthContext.Provider value={{email, token, login, logout}}>
        {children}
      </AuthContext.Provider>
      
    </div>
  );
}

// export default AuthContext;
export const useAuth = () => useContext(AuthContext);
