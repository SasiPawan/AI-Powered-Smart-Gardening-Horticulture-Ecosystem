/**
 * PredictionCard Component
 * Displays plant identification and disease detection results
 */

import React from 'react';
import HealthBadge from './HealthBadge';
import './PredictionCard.css';

export default function PredictionCard({ prediction, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 8 }}>Analyzing image...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-state-title">Analysis Failed</div>
        <p>{error}</p>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <div className="empty-state-title">No Analysis Yet</div>
        <p>Upload an image to begin plant analysis</p>
      </div>
    );
  }

  const confidencePercent = Math.round(prediction.plant_confidence * 100);
  const diseaseConfidence = Math.round(prediction.disease_confidence * 100);

  return (
    <div className="card prediction-card">
      <div className="card-title">Analysis Results</div>

      <div className="prediction-section">
        <h4>Plant Identification</h4>
        <div className="prediction-row">
          <span className="label">Plant Name:</span>
          <span className="value">{prediction.plant_name}</span>
        </div>
        <div className="prediction-row">
          <span className="label">Confidence:</span>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: `${confidencePercent}%` }}
            ></div>
            <span className="confidence-text">{confidencePercent}%</span>
          </div>
        </div>
      </div>

      <div className="prediction-section">
        <h4>Disease Detection</h4>
        <div className="prediction-row">
          <span className="label">Status:</span>
          {prediction.is_healthy ? (
            <span className="badge badge-success">Healthy</span>
          ) : (
            <>
              <span className="value disease-name">{prediction.disease_name}</span>
            </>
          )}
        </div>
        {!prediction.is_healthy && (
          <div className="prediction-row">
            <span className="label">Confidence:</span>
            <div className="confidence-bar">
              <div
                className="confidence-fill disease"
                style={{ width: `${diseaseConfidence}%` }}
              ></div>
              <span className="confidence-text">{diseaseConfidence}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="prediction-section summary">
        <div className="label">Summary</div>
        <p>{prediction.summary}</p>
      </div>

      <div className="prediction-section">
        <div className="label">Recommended Action</div>
        <p className="action-text">{prediction.recommended_next_step}</p>
      </div>
    </div>
  );
}
