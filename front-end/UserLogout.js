import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true); // Set loading to true during logout process

      // Check if the user is logged in before making the logout request
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('User is not logged in');
        setLoading(false); // Set loading back to false
        return;
      }

      const response = await axios.post('http://localhost:3000/Users/logout', null, {
        headers: { Authorization: token },
      });
      sessionStorage.clear();
      setLoading(false); // Set loading back to false after logout

      if (response.status === 200) {
        console.log('User logged out successfully');
        navigate('/Users/login'); // Redirect to login page after successful logout
      } else {
        console.error('Logout failed:', response.data.error);
      }
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
