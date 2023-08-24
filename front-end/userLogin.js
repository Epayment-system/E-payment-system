import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLogin} from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import './index.css'; // Import custom CSS file
import axios from './api/axios';

const UserLogin = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Sign-In API script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '587101034562-48rg0utnf5bs3cem5mcmqpftmg9urf9t.apps.googleusercontent.com',
        callback:" handleGoogleSignIn",
      });
    };

    return () => {
      // Clean up the dynamically added script
      document.body.removeChild(script);
    };
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // navigate('/Users/logout');

    try {
      const response = await axios.post('http://localhost:3000/Users/login', {
        Email: Email,
        Password: Password,
      });

      const data = await response.data;

      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log('User logged in successfully');
      } else if (response.status === 400) {
        console.error('Bad request:', data.error);
      } else {
        console.error('User login failed:', data.error);
      }
    } catch (error) {
      console.error('An error occurred during User login:', error);
    }

    setLoading(false);

    setEmail('');
    setPassword('');
  };
  
  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };
 
  const handleForgetPasswordClick = () => {
    navigate('/reset-password');
  };

  // Define the handleGoogleSignIn function
window.handleGoogleSignIn = async (response) => {
  const { credential } = response;
  setLoading(true);

  try {
    // Verify the ID Token
    // const decodedToken = jwt_decode(credential);

    // // Access token claims
    // const { Email } = decodedToken;

    // Perform further validation or processing with the claims

    // Make the API request with the verified token
    const googleResponse = await axios.post(
      'http://localhost:3000/Users/googleSignIn',
      {
        token: credential, // Update the property name to 'token'
      }
    );

    const data = await googleResponse.data;

    if (googleResponse.status === 200) {
      setIsLoggedIn(true);
      console.log('User logged in with Google successfully');
    } else {
      console.error('Google login failed:', data.error);
    }
  } catch (error) {
    console.error('An error occurred during Google login:', error);
  }

  setLoading(false);
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
          placeholder="Username or Email"
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
        <div id="g_id_onload"
         data-client_id='587101034562-48rg0utnf5bs3cem5mcmqpftmg9urf9t.apps.googleusercontent.com'
         data-callback="handleGoogleSignIn">
       </div>
       <div className="g_id_signin"></div>
      </Form>
    </div>
  );
};

export default UserLogin;
