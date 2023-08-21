import React, { useState } from 'react';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Button, message, Form, Input, Upload, Modal } from 'antd';
import Dashboard from './Dashboard';

const ServiceProviderRegistrationForm = () => {
  const [formData, setFormData] = useState({
    serviceProviderBIN: '',
    serviceProviderName: '',
    servicesOffered: '',
    BankName: '',
    BankAccountNumber: '',
    phoneNumber: '',
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serviceProviderBIN) {
      newErrors.serviceProviderBIN = 'Business Identification Number is required';
    }

    if (!formData.serviceProviderName) {
      newErrors.serviceProviderName = 'ServiceProviderName is required';
    }

    if (!formData.servicesOffered) {
      newErrors.servicesOffered = 'Services Offered is required';
    }

    if (!formData.BankName) {
      newErrors.BankName = 'Bank Name is required';
    }

    if (!formData.BankAccountNumber) {
      newErrors.BankAccountNumber = 'Bank Account Number is required';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number is invalid';
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
        formDataToSend.append('serviceProviderBIN', formData.serviceProviderBIN);
        formDataToSend.append('serviceProviderName', formData.serviceProviderName);
        formDataToSend.append('servicesOffered', formData.servicesOffered);
        formDataToSend.append('BankName', formData.BankName);
        formDataToSend.append('BankAccountNumber', formData.BankAccountNumber);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('serviceProviderAuthorizationLetter', file);

        await axios.post('http://localhost:3000/serviceprovider', formDataToSend);
        console.log('Registered successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle the error, show an error message, etc.
      }
    }
  };
  return (<Dashboard content={
    <Form name="serviceProviderRegistrationForm" onSubmit={handleSubmit}>
      <h1>Service provider Registration</h1>
      <Form.Item
        name="serviceProviderBIN"
        label="Business Identification Number"
        rules={[{ required: true, message: 'Please enter the Business Identification Number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="serviceProviderName"
        label="ServiceProviderName"
        rules={[{ required: true, message: 'Please enter the Service Provider Name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="servicesOffered"
        label="Services Offered"
        rules={[{ required: true, message: 'Please enter the Services Offered' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="BankName"
        label="Bank Name"
        rules={[{ required: true, message: 'Please enter the Bank Name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="BankAccountNumber"
        label="Bank Account Number"
        rules={[{ required: true, message: 'Please enter the Bank Account Number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ required: true, message: 'Please enter the Phone Number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="authorizationLetter" label="Authorization Letter">
        <input type="file" name="authorizationLetter" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>}/>
  );
};

export default ServiceProviderRegistrationForm;