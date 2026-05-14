/**
 * Plant Details Page
 * Individual plant view with growth history and logging
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HealthBadge from '../components/HealthBadge';
import GrowthLogForm from '../components/GrowthLogForm';
import GrowthHistory from '../components/GrowthHistory';
import { getPlantById, addGrowthLog } from '../api/plantsApi';
import './PlantDetails.css';

export default function PlantDetails() {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);

  useEffect(() => {
    const loadPlant = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPlantById(plantId);
        setPlant(data);
      } catch (err) {
        setError(err.message || 'Failed to load plant');
      } finally {
        setIsLoading(false);
      }
    };

    loadPlant();
  }, [plantId]);

  const handleAddGrowthLog = async (logData) => {
    setIsSubmittingLog(true);
    try {
      const updatedPlant = await addGrowthLog(plantId, logData);
      setPlant(updatedPlant);
    } catch (err) {
      alert('Failed to save growth log: ' + err.message);
    } finally {
      setIsSubmittingLog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="plant-details-page">
        <div className="page-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>Plant Details</h1>
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
      <div className="plant-details-page">
        <div className="page-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>Plant Details</h1>
        </div>
        <div className="container">
          <div className="error-state">
            <div className="error-state-title">Failed to Load Plant</div>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="plant-details-page">
        <div className="page-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>Plant Details</h1>
        </div>
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🌿</div>
            <div className="empty-state-title">Plant Not Found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-details-page">
      <div className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
        <h1>{plant.nickname}</h1>
      </div>

      <div className="container">
        {/* Plant Overview */}
        <div className="card plant-overview">
          <div className="overview-grid">
            <div className="overview-item">
              <span className="label">Plant Type:</span>
              <span className="value">{plant.plant_name}</span>
            </div>
            <div className="overview-item">
              <span className="label">Disease Status:</span>
              <span className="value">{plant.disease_status}</span>
            </div>
            <div className="overview-item">
              <span className="label">Health Score:</span>
              <HealthBadge healthScore={plant.health_score} />
            </div>
            <div className="overview-item">
              <span className="label">Last Watered:</span>
              <span className="value">
                {new Date(plant.last_watered).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Health Score Visualization */}
          <div className="health-visualization">
            <div className="label">Overall Health</div>
            <div className="health-bar-large">
              <div
                className="health-bar-fill-large"
                style={{ width: `${plant.health_score}%` }}
              ></div>
            </div>
            <div className="health-percentage">{plant.health_score}%</div>
          </div>
        </div>

        {/* Growth Tracking Section */}
        <div className="tracking-section">
          <h2>Growth Tracking</h2>
          
          <div className="tracking-layout">
            <div className="form-column">
              <GrowthLogForm
                onSubmit={handleAddGrowthLog}
                isLoading={isSubmittingLog}
              />
            </div>

            <div className="history-column">
              <div className="card">
                <GrowthHistory logs={plant.growth_logs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
