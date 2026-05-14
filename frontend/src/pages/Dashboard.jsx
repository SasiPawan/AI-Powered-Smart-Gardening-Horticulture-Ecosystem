/**
 * Dashboard Page
 * Overview of all user plants and their health status
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HealthBadge from '../components/HealthBadge';
import { getAllPlants } from '../api/plantsApi';
import './Dashboard.css';

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllPlants();
        setPlants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlants();
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <h1>Plant Dashboard</h1>
          <p>Monitor all your plants in one place</p>
        </div>
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <h1>Plant Dashboard</h1>
        </div>
        <div className="container">
          <div className="error-state">
            <div className="error-state-title">Failed to Load Plants</div>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Plant Dashboard</h1>
        <p>Monitor all your plants in one place</p>
      </div>

      <div className="container">
        {plants.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🪴</div>
            <div className="empty-state-title">No Plants Yet</div>
            <p>Start by analyzing a plant to add it to your dashboard</p>
            <Link to="/analyze" className="btn btn-primary" style={{ marginTop: 16 }}>
              Analyze Plant
            </Link>
          </div>
        ) : (
          <>
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-number">{plants.length}</div>
                <div className="stat-label">Total Plants</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {plants.filter(p => p.health_score >= 75).length}
                </div>
                <div className="stat-label">Healthy</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {plants.filter(p => p.health_score < 50).length}
                </div>
                <div className="stat-label">Need Attention</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {Math.round(
                    plants.reduce((sum, p) => sum + p.health_score, 0) / plants.length
                  )}
                </div>
                <div className="stat-label">Avg Health</div>
              </div>
            </div>

            <div className="plants-grid">
              {plants.map(plant => (
                <Link
                  key={plant.id}
                  to={`/plant/${plant.id}`}
                  className="plant-card"
                >
                  <div className="plant-card-header">
                    <h3>{plant.nickname}</h3>
                    <HealthBadge
                      healthScore={plant.health_score}
                      status={
                        plant.health_score >= 75
                          ? 'Healthy'
                          : plant.health_score >= 50
                          ? 'Caution'
                          : 'Critical'
                      }
                    />
                  </div>

                  <div className="plant-info">
                    <div className="info-row">
                      <span className="label">Type:</span>
                      <span className="value">{plant.plant_name}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Status:</span>
                      <span className="value">{plant.disease_status}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Last Watered:</span>
                      <span className="value">
                        {new Date(plant.last_watered).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="plant-health-bar">
                    <div
                      className="health-bar-fill"
                      style={{ width: `${plant.health_score}%` }}
                    ></div>
                  </div>

                  <div className="plant-card-footer">
                    <span className="logs-count">
                      📊 {plant.growth_logs.length} logs
                    </span>
                    <span className="view-btn">View Details →</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
