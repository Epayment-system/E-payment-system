import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import CSS file
import axios from './api/axios';

const UserLogin = () => {
  const [Email, setEmail] = useState(''); // State for email input
  const [Password, setPassword] = useState(''); // State for password input
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [loading, setLoading] = useState(false); // State to track loading state
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    // Load Google Sign-In API script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Google Sign-In API with client ID and callback
      window.google.accounts.id.initialize({
        client_id: '587101034562-48rg0utnf5bs3cem5mcmqpftmg9urf9t.apps.googleusercontent.com',
        callback: 'handleGoogleSignIn',
      });
    };

    return () => {
      // Clean up the dynamically added script
      document.body.removeChild(script);
    };
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state on input change
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update password state on input change
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading state to true
    // navigate('/Users/logout');
    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:3000/Users/login', {
        Email: Email,
        Password: Password,
      });

      const data = await response.data;

      if (response.status === 200) {
        setIsLoggedIn(true); // Set login status to true
        console.log('User logged in successfully');
      } else if (response.status === 400) {
        console.error('Bad request:', data.error);
      } else {
        console.error('User login failed:', data.error);
      }
    } catch (error) {
      console.error('An error occurred during User login:', error);
    }

    setLoading(false); // Reset loading state
    setEmail(''); // Clear email input
    setPassword(''); // Clear password input
  };

  const handleForgetPasswordClick = () => {
    navigate('/Users/resetpassword'); // Navigate to password reset page
  };

  // Define the handleGoogleSignIn function
  window.handleGoogleSignIn = async (response) => {
    const { credential } = response;
    setLoading(true); // Set loading state to true

    try {
      // Make the API request with the verified token
      const googleResponse = await axios.post(
        'https://www.googleapis.com/oauth2/v3/tokeninfo',
        {
          id_token: credential, // Update the property name to 'id_token'
        }
      );

      const data = await googleResponse.data;

      if (googleResponse.status === 200) {
        setIsLoggedIn(true); // Set login status to true
        console.log('User logged in with Google successfully');
       
      } else {
        console.error('Google login failed:', data.error);
      }
    } catch (error) {
      console.error('An error occurred during Google login:', error);
    }

    setLoading(false); // Reset loading state
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <Form className="form" onFinish={handleSubmit}>
        <label htmlFor="Email">
          <UserOutlined className="icon" />
        </label>
        <Input
          type="text"
          name="Email"
          placeholder="Email Address"
          id="Email"
          required
          value={Email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">
          <LockOutlined className="icon" />
        </label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          required
          value={Password}
          onChange={handlePasswordChange}
        />
        <Button className="button" type="primary" htmlType="submit" loading={loading} disabled={loading}>
          Login
        </Button>
        <p>Create an account <a href="/signup">here</a>.</p>
        <a href="#/" onClick={handleForgetPasswordClick}>Forget Password</a>
        <div id="g_id_onload" data-client_id='587101034562-48rg0utnf5bs3cem5mcmqpftmg9urf9t.apps.googleusercontent.com' data-callback="handleGoogleSignIn"></div>
        <div className="g_id_signin"></div>
      </Form>
    </div>
  );
};

export default UserLogin;
