/**
 * HealthBadge Component
 * Displays health status with color coding
 */

import React from 'react';
import { getHealthBadgeClass } from '../types/contracts';
import './HealthBadge.css';

export default function HealthBadge({ healthScore, status }) {
  const badgeClass = getHealthBadgeClass(healthScore);

  return (
    <div className="health-badge-container">
      <div className={`badge health-score-badge ${badgeClass}`}>
        {status || `Health: ${Math.round(healthScore)}%`}
      </div>
    </div>
  );
}
