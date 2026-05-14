/**
 * Home Page
 * Landing page with project intro and CTA
 */

import React from 'react';
import { Link } from 'react-router-dom';
import SupportedPlantsBanner from '../components/SupportedPlantsBanner';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">🌱</div>
            <h1>Plant Health Dashboard</h1>
            <p className="hero-subtitle">
              Hackathon MVP - AI-Powered Plant Disease Detection & Care Management
            </p>
            <p className="hero-description">
              Upload plant images for instant disease detection, get personalized care recommendations,
              and track your plants' health and growth over time.
            </p>
            <Link to="/analyze" className="btn btn-primary btn-large">
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <SupportedPlantsBanner />

          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3>Image Upload</h3>
              <p>Simply upload a plant photo for instant analysis</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Plant Identification</h3>
              <p>AI-powered plant recognition with confidence scores</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🦠</div>
              <h3>Disease Detection</h3>
              <p>Detect plant diseases and get immediate guidance</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💧</div>
              <h3>Care Recommendations</h3>
              <p>Personalized watering, fertilizer, and soil guidance</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Plant Dashboard</h3>
              <p>Track multiple plants and their health status</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Growth Tracking</h3>
              <p>Log growth milestones and monitor plant progress</p>
            </div>
          </div>
        </div>
      </section>

      <section className="supported-plants-section">
        <div className="container">
          <h2>Supported Plants (MVP)</h2>
          <div className="plants-showcase">
            <div className="plant-showcase-item">
              <div className="plant-emoji">🍅</div>
              <h3>Tomato</h3>
              <p>Detect early blight, leaf spots, and other diseases</p>
            </div>
            <div className="plant-showcase-item">
              <div className="plant-emoji">🥔</div>
              <h3>Potato</h3>
              <p>Monitor health and detect common potato diseases</p>
            </div>
            <div className="plant-showcase-item">
              <div className="plant-emoji">🌽</div>
              <h3>Corn/Maize</h3>
              <p>Track growth and identify corn-specific issues</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Analyze Your Plants?</h2>
          <p>Start by uploading a plant image and get instant insights</p>
          <Link to="/analyze" className="btn btn-primary btn-large">
            Analyze Plant Now
          </Link>
        </div>
      </section>
    </div>
  );
}
