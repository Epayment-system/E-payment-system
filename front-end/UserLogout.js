import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import custom CSS file

const LogoutPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true); // Set loading to true during logout process
      const response = await axios.post('http://localhost:3000/Users/logout');
      sessionStorage.clear();
      setLoading(false); // Set loading back to false after logout
  
      if (response.status === 200) {
        console.log('User Logged out successfully');
      } else {
        console.error('Logout failed:', response.data.error);
      }
  
      navigate('/Users/login'); // Redirect to logout page after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div>
      <Button
        className="button"
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={loading}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutPage;
