/**
 * CareCard Component
 * Displays care recommendations for detected plant
 */

import React from 'react';
import './CareCard.css';

export default function CareCard({ care, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 8 }}>Getting recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-state-title">Failed to Load Recommendations</div>
        <p>{error}</p>
      </div>
    );
  }

  if (!care) {
    return null;
  }

  return (
    <div className="card care-card">
      <div className="card-title">Plant Care Guide</div>
      <div className="card-subtitle">{care.plant_name} Care Recommendations</div>

      {/* Health Status */}
      <div className="care-section">
        <h4>Health Status</h4>
        <div className="health-display">
          <div className="health-score">{care.health_score}</div>
          <div className="health-info">
            <div className="health-status">{care.health_status}</div>
            <div className="health-bar">
              <div
                className="health-bar-fill"
                style={{ width: `${care.health_score}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {care.warnings && care.warnings.length > 0 && (
        <div className="care-section warnings">
          <h4>⚠️ Warnings</h4>
          <ul>
            {care.warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Care Instructions */}
      <div className="care-section">
        <h4>💧 Watering</h4>
        <p>{care.watering_advice}</p>
      </div>

      <div className="care-section">
        <h4>🌿 Fertilizer</h4>
        <p>{care.fertilizer_advice}</p>
      </div>

      <div className="care-section">
        <h4>🌍 Soil</h4>
        <p>{care.soil_advice}</p>
      </div>

      <div className="care-section">
        <h4>☀️ Sunlight</h4>
        <p>{care.sunlight_advice}</p>
      </div>

      {/* Care Tips */}
      {care.care_tips && care.care_tips.length > 0 && (
        <div className="care-section tips">
          <h4>✨ Care Tips</h4>
          <ul>
            {care.care_tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {care.next_steps && care.next_steps.length > 0 && (
        <div className="care-section next-steps">
          <h4>📋 Next Steps</h4>
          <ol>
            {care.next_steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
