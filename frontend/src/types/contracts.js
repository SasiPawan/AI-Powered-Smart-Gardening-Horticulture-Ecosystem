/**
 * Shared contract types for the Plant Health Dashboard
 * These interfaces match the backend API responses
 */

/**
 * Plant prediction response from the ML model
 * @typedef {Object} PredictionResponse
 * @property {string} plant_name - Identified plant name (Tomato, Potato, Corn/Maize)
 * @property {number} plant_confidence - Confidence score for plant identification (0-1)
 * @property {string} disease_name - Detected disease name (or "Healthy" if no disease)
 * @property {number} disease_confidence - Confidence score for disease detection (0-1)
 * @property {boolean} is_healthy - Whether the plant is healthy
 * @property {string} summary - Human-readable summary of findings
 * @property {string} recommended_next_step - Suggested action for the user
 */
export const PredictionResponseSchema = {
  plant_name: 'string',
  plant_confidence: 'number',
  disease_name: 'string',
  disease_confidence: 'number',
  is_healthy: 'boolean',
  summary: 'string',
  recommended_next_step: 'string'
};

/**
 * Care recommendation response from the care system
 * @typedef {Object} CareResponse
 * @property {string} plant_name - Plant name
 * @property {string} health_status - Overall health status
 * @property {number} health_score - Health score (0-100)
 * @property {string} watering_advice - Watering guidance
 * @property {string} fertilizer_advice - Fertilizer guidance
 * @property {string} soil_advice - Soil recommendations
 * @property {string} sunlight_advice - Sunlight requirements
 * @property {Array} care_tips - Additional care tips
 * @property {Array} warnings - Important warnings
 * @property {Array} next_steps - Recommended next steps
 */
export const CareResponseSchema = {
  plant_name: 'string',
  health_status: 'string',
  health_score: 'number',
  watering_advice: 'string',
  fertilizer_advice: 'string',
  soil_advice: 'string',
  sunlight_advice: 'string',
  care_tips: 'array',
  warnings: 'array',
  next_steps: 'array'
};

/**
 * Plant object in dashboard
 * @typedef {Object} Plant
 * @property {string} id - Unique plant identifier
 * @property {string} nickname - User-given nickname
 * @property {string} plant_name - Plant type (Tomato, Potato, Corn/Maize)
 * @property {string} disease_status - Current disease status
 * @property {number} health_score - Current health score (0-100)
 * @property {string} last_watered - Last watering date (ISO format)
 * @property {Array} growth_logs - Array of growth log entries
 */
export const PlantSchema = {
  id: 'string',
  nickname: 'string',
  plant_name: 'string',
  disease_status: 'string',
  health_score: 'number',
  last_watered: 'string',
  growth_logs: 'array'
};

/**
 * Growth log entry
 * @typedef {Object} GrowthLog
 * @property {string} id - Unique log identifier
 * @property {string} date - Log date (ISO format)
 * @property {string} description - Log description
 * @property {number} plant_height - Plant height in cm
 * @property {number} leaf_count - Number of leaves
 * @property {string} observation - User observation notes
 */
export const GrowthLogSchema = {
  id: 'string',
  date: 'string',
  description: 'string',
  plant_height: 'number',
  leaf_count: 'number',
  observation: 'string'
};

// Supported plants - exactly 3 for MVP
export const SUPPORTED_PLANTS = ['Tomato', 'Potato', 'Corn/Maize'];

// Health score thresholds
export const HEALTH_THRESHOLDS = {
  HEALTHY: 75,      // >= 75: Healthy
  CAUTION: 50,      // 50-74: Needs Attention
  CRITICAL: 0       // < 50: Critical
};

// Get health status from health score
export const getHealthStatus = (healthScore) => {
  if (healthScore >= HEALTH_THRESHOLDS.HEALTHY) return 'Healthy';
  if (healthScore >= HEALTH_THRESHOLDS.CAUTION) return 'Needs Attention';
  return 'Critical';
};

// Get health badge color
export const getHealthBadgeClass = (healthScore) => {
  if (healthScore >= HEALTH_THRESHOLDS.HEALTHY) return 'badge-success';
  if (healthScore >= HEALTH_THRESHOLDS.CAUTION) return 'badge-warning';
  return 'badge-danger';
};
