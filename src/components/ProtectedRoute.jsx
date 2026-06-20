import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  // যদি ইউজার লগইন না করা থাকে, তবে তাকে সরাসরি /login পেজে পাঠিয়ে দিন
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // যদি লগইন করা থাকে, তবে টুলটি দেখান
  return <>{children}</>;
};

export default ProtectedRoute;