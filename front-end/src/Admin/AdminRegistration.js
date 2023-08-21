import React, { useState } from 'react';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Button, message, Form, Input, Upload, Modal } from 'antd';
import Dashboard from './Dashboard';

const AdminRegistrationForm = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    UserName: '',
    Password: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    Role: 'Admin',
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.FirstName) {
      newErrors.FirstName = 'First Name is required';
    }

    if (!formData.LastName) {
      newErrors.LastName = 'Last Name is required';
    }

    if (!formData.Gender) {
      newErrors.Gender = 'Gender is required';
    }

    if (!formData.UserName) {
      newErrors.UserName = 'User Name is required';
    }

    if (!formData.Password) {
      newErrors.Password = 'Password is required';
    }

    if (!formData.Email) {
      newErrors.Email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.Email)) {
      newErrors.Email = 'Email is invalid';
    }

    if (!formData.PhoneNumber) {
      newErrors.PhoneNumber = 'Phone Number is required';
    } else if (!/^\+?\d+$/.test(formData.PhoneNumber)) {
      newErrors.PhoneNumber = 'Phone Number is invalid';
    }

    if (!formData.Address) {
      newErrors.Address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('FirstName', formData.FirstName);
        formDataToSend.append('LastName', formData.LastName);
        formDataToSend.append('Gender', formData.Gender);
        formDataToSend.append('UserName', formData.UserName);
        formDataToSend.append('Password', formData.Password);
        formDataToSend.append('Email', formData.Email);
        formDataToSend.append('PhoneNumber', formData.PhoneNumber);
        formDataToSend.append('Address', formData.Address);
        formDataToSend.append('Role', formData.Role);
        formDataToSend.append('ProfilePicture', file);

        await axios.post('http://localhost:3000/admin', formDataToSend);
        console.log('Registered successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle the error, show an error message, etc.
      }
    }
  };

  return (
    <Dashboard
      content={
        <Form name="adminRegistrationForm" onSubmit={handleSubmit}>
          <h1>Admin Registration</h1>
          <Form.Item
            name="FirstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter your First Name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="LastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter your Last Name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select your Gender' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="UserName"
            label="User Name"
            rules={[{ required: true, message: 'Please enter your User Name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your Password' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="Email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your Email' },
              { type: 'email', message: 'Please enter a valid Email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="PhoneNumber"
            label="Phone Number"
           rules={[{ required: true, message: 'Please enter your Phone Number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Address"
            label="Address"
            rules={[{ required: true, message: 'Please enter your Address' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="ProfilePicture" label="Profile Picture">
            <input type="file" name="ProfilePicture" onChange={handleFileChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      }
    />
  );
};

export default AdminRegistrationForm;