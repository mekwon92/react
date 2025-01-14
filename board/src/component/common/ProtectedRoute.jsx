import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const ProtectedRoute = ({children}) => {
  // const token = localStorage.getItem('token');
  const {token} = useAuth(); //이렇게 바뀜~
  
  if(!token) {
    return <Navigate to={'/'} replace/>
  }

  return children;
}

export default ProtectedRoute;
