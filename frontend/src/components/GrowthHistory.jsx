/**
 * GrowthHistory Component
 * Displays growth logs over time
 */

import React from 'react';
import './GrowthHistory.css';

export default function GrowthHistory({ logs, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-state-title">Failed to Load History</div>
        <p>{error}</p>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📊</div>
        <div className="empty-state-title">No Growth Records</div>
        <p>Start tracking by adding your first growth log</p>
      </div>
    );
  }

  // Sort logs by date (newest first)
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="growth-history">
      <div className="history-title">Growth History</div>
      
      <div className="timeline">
        {sortedLogs.map((log, idx) => (
          <div key={log.id || idx} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="log-header">
                <div className="log-description">
                  <strong>{log.description}</strong>
                </div>
                <div className="log-date">
                  {new Date(log.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <div className="log-metrics">
                <div className="metric">
                  <span className="metric-label">Height:</span>
                  <span className="metric-value">{log.plant_height} cm</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Leaves:</span>
                  <span className="metric-value">{log.leaf_count}</span>
                </div>
              </div>

              {log.observation && (
                <div className="log-observation">
                  <p>{log.observation}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
