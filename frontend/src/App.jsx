/**
 * Main App Component
 * Application entry point with React Router setup
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Dashboard from './pages/Dashboard';
import PlantDetails from './pages/PlantDetails';

import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plant/:plantId" element={<PlantDetails />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="footer-content">
            <p>&copy; 2026 Plant Health Dashboard MVP. Hackathon Edition.</p>
            <p>Supports: Tomato, Potato, Corn/Maize</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
