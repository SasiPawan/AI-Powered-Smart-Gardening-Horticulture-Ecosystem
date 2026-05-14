/**
 * Navbar Component
 * Main navigation bar for the application
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-icon">🌱</span>
          Plant Health MVP
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/analyze" className="nav-link">Analyze</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
