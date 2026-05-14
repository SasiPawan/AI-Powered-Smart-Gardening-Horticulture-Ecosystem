/**
 * SupportedPlantsBanner Component
 * Displays the three supported plants for this MVP
 */

import React from 'react';
import { SUPPORTED_PLANTS } from '../types/contracts';
import './SupportedPlantsBanner.css';

export default function SupportedPlantsBanner() {
  return (
    <div className="supported-plants-banner">
      <div className="banner-content">
        <span className="banner-icon">✓</span>
        <div className="banner-text">
          <strong>Currently Supported Plants:</strong>
          <div className="plants-list">
            {SUPPORTED_PLANTS.map((plant, idx) => (
              <span key={idx} className="plant-tag">
                {plant}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
