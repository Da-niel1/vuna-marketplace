import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Sell from './pages/Sell';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Payment from './pages/Payment';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment/:itemId" element={<Payment />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;