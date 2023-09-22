import React, { useState } from "react";
//import {Form,Button}from 'antd';
import axios from "axios";
import "./agentRegistration.css";
import { Layout, Menu, Avatar, Button, message, Form, Input, Upload, Modal } from 'antd';
import Dashboard from "./Dashboard";




const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    agentBIN: "",
   agentName: "",
    agentEmail: "",
    servicesOffered: "",
    phoneNumber: "+251",
    agentAuthorizationLetter: null,//changed to null
  });

  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};

    // Business Identification Number validation
    if (!formData.agentBIN) {
      newErrors.agentBIN = "Business Identification Number is required";
    }

    // Bank Name validation
    if (!formData.agentName) {
      newErrors.agentName = "Bank Name is required";
    }

    // Email validation
    if (!formData.agentEmail) {
      newErrors.agentEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.agentEmail)) {
      newErrors.agentEmail = "Email is invalid";
    }

    // Services Offered validation
    if (!formData.servicesOffered) {
      newErrors.servicesOffered = "Services Offered is required";
    }

    // Phone Number validation

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\+[0-9\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number is invalid";
    } else if (formData.phoneNumber.replace(/[^\d]/g, "").length < 12) {
      newErrors.phoneNumber = "Phone Number must have at least 12 digits";
    }

    // Agent Authorization Letter validation
    if (!formData.agentAuthorizationLetter) {
      newErrors.agentAuthorizationLetter = "Agent Authorization Letter is required";
    }else if (!isFileValid(formData.agentAuthorizationLetter)) {
      newErrors.agentAuthorizationLetter = "Invalid file format. Only JPG, JPEG, PNG, or PDF files are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const isFileValid = (file) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    return allowedFileTypes.includes(file.type);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try{
        const formDataToSend = new FormData();
        formDataToSend.append('agentBIN', formData.agentBIN);
        formDataToSend.append('agentName', formData.agentName);
        formDataToSend.append('agentEmail', formData.agentEmail);
        formDataToSend.append('servicesOffered', formData.servicesOffered);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('agentAuthorizationLetter',formData.agentAuthorizationLetter );
            
        //make an HTTP post request to the backend
        axios.post('http://localhost:3001/agent', formDataToSend);
        console.log('Registered successfully!');
      } catch (error) {
        // show an error message
        console.error('Error submitting form:', error);
       
      }
    }
  };
      
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      agentAuthorizationLetter: file,
    }));
  };
return (
    <Dashboard content={<Form name="agentRegistrationForm" onFinish={handleSubmit}>
    <h1>Agent Registration</h1>

    <Form.Item
      label="Business Identification Number"
      name="agentBIN"
      rules={[{ required: true, message: 'Please enter the Business Identification Number' }]}
      hasFeedback
      validateStatus={errors.agentBIN ? 'error' : ''}
      help={errors.agentBIN}
    >
      <Input value={formData.agentBIN} onChange={handleChange} placeholder="Enter business identification number" />
    </Form.Item>

    <Form.Item
      label="Bank Name"
      name="agentName"
      rules={[{ required: true, message: 'Please enter the Bank Name' }]}
      hasFeedback
      validateStatus={errors.agentName ? 'error' : ''}
      help={errors.agentName}
    >
      <Input value={formData.agentName} onChange={handleChange} placeholder="Enter bank name" />
    </Form.Item>

    <Form.Item
      label="Email"
      name="agentEmail"
      rules={[
        { required: true, message: 'Please enter the Email' },
        { type: 'email', message: 'Please enter a valid email address' },
      ]}
      hasFeedback
      validateStatus={errors.agentEmail ? 'error' : ''}
      help={errors.agentEmail}
    >
      <Input value={formData.agentEmail} onChange={handleChange} placeholder="Enter email address" />
    </Form.Item>

    <Form.Item
      label="Services Offered"
      name="servicesOffered"
      rules={[{ required: true, message: 'Please enter the Services Offered' }]}
      hasFeedback
      validateStatus={errors.servicesOffered ? 'error' : ''}
      help={errors.servicesOffered}
    >
      <Input value={formData.servicesOffered} onChange={handleChange} placeholder="Enter services you offer" />
    </Form.Item>

    <Form.Item
      label="Phone Number"
      name="phoneNumber"
      rules={[{ required: true, message: 'Please enter the Phone Number' }]}
      hasFeedback
      validateStatus={errors.phoneNumber ? 'error' : ''}
      help={errors.phoneNumber}
    >
      <Input value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number" />
    </Form.Item>

    <Form.Item
      label="Authorization Letter"
      name="agentAuthorizationLetter"
      rules={[{ required: true, message: 'Please attach the Authorization Letter' }]}
      validateStatus={errors.agentAuthorizationLetter ? 'error' : ''}
      help={errors.agentAuthorizationLetter}
    >
      <Input type="file" onChange={handleFileChange} />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>}/>
);
};

export default RegistrationForm;