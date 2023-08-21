import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './Admin/AdminLogin.js';
import Dashboard from './Admin/Dashboard.js';
import AgentsList from './Admin/AgentsList.js';
import ServiceProvidersList from './Admin/ServiceList.js';
import UsersList from './Admin/UsersList.js';
import ServiceProviderRegistrationForm from './Admin/ServiceProvidersRegistration';
import AdminRegistrationForm from './Admin/AdminRegistration.js';
import AgentRegistrationForm from './Admin/AgentRegistration.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/:adminId"
          element={<Dashboard />}
        />
        <Route 
        path="/admin/agents"
        element= {<AgentsList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
        <Route 
        path="/admin/agents/registration"
        element= {<AgentRegistrationForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
        <Route 
        path="/admin/service-providers"
        element= {<ServiceProvidersList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
        <Route 
        path="/admin/users"
        element= {<UsersList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
        <Route 
        path="/admin/service-providers/registration"
        element= {<ServiceProviderRegistrationForm />}
        />
        <Route 
        path="/admin/user/registration"
        element= {<AdminRegistrationForm />}
        />
      </Routes>
    </Router>
  );
}

export default App;