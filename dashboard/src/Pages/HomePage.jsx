import { Button } from '@/components/ui/button'
import { clearAllUsersErrors, logout } from '@/store/slices/userSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const HomePage = () => {

const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };
  const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default HomePage