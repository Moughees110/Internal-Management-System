import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyAuth } from '../services/authService';
import { initializeAuth } from '../store/authSlice';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
   
      dispatch(initializeAuth());
      
     
      const isValid = await verifyAuth();
      
      if (!isValid) {
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  if (status === 'loading') {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;