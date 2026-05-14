/**
 * Plants API Wrapper
 * Handles dashboard plants and growth tracking
 */

import mockPlantsData from '../mock/mockPlants.json';

/**
 * Get all user plants for dashboard
 * @returns {Promise<Array>} Array of plant objects
 * 
 * LIVE BACKEND INTEGRATION:
 * Replace this function to call your actual backend endpoint:
 * - GET /api/plants
 * - Return array of plant objects with growth logs
 */
export async function getAllPlants() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // MOCK DATA: Return sample plants
    // In production, this would be:
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/plants`, {
    //   credentials: 'include'
    // });
    // return await response.json();

    return mockPlantsData;
  } catch (error) {
    console.error('Get plants API error:', error);
    throw new Error('Failed to load plants. Please try again.');
  }
}

/**
 * Get a specific plant by ID
 * @param {string} plantId - The plant ID
 * @returns {Promise<Object>} Plant object with full growth history
 * 
 * LIVE BACKEND INTEGRATION:
 * Replace this function to call your actual backend endpoint:
 * - GET /api/plants/:id
 * - Return single plant object
 */
export async function getPlantById(plantId) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // MOCK DATA: Find plant in mock data
    // In production, this would be:
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/plants/${plantId}`, {
    //   credentials: 'include'
    // });
    // return await response.json();

    const plant = mockPlantsData.find(p => p.id === plantId);
    if (!plant) {
      throw new Error('Plant not found');
    }
    return plant;
  } catch (error) {
    console.error('Get plant API error:', error);
    throw error;
  }
}

/**
 * Add a growth log to a plant
 * @param {string} plantId - The plant ID
 * @param {Object} logData - Growth log data
 * @returns {Promise<Object>} Updated plant object
 * 
 * LIVE BACKEND INTEGRATION:
 * Replace this function to call your actual backend endpoint:
 * - POST /api/plants/:id/growth-logs
 * - Send growth log object
 * - Return updated plant
 */
export async function addGrowthLog(plantId, logData) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // MOCK DATA: Create log with generated ID
    // In production, this would be:
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/plants/${plantId}/growth-logs`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(logData),
    //   credentials: 'include'
    // });
    // return await response.json();

    const plant = mockPlantsData.find(p => p.id === plantId);
    if (!plant) {
      throw new Error('Plant not found');
    }

    const newLog = {
      id: `log_${Date.now()}`,
      date: logData.date || new Date().toISOString().split('T')[0],
      ...logData
    };

    plant.growth_logs.push(newLog);
    return plant;
  } catch (error) {
    console.error('Add growth log API error:', error);
    throw error;
  }
}

/**
 * Update plant health information
 * @param {string} plantId - The plant ID
 * @param {Object} updateData - Fields to update (health_score, disease_status, etc.)
 * @returns {Promise<Object>} Updated plant object
 * 
 * LIVE BACKEND INTEGRATION:
 * Replace this function to call your actual backend endpoint:
 * - PATCH /api/plants/:id
 * - Send update object
 * - Return updated plant
 */
export async function updatePlant(plantId, updateData) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // MOCK DATA: Update plant properties
    // In production, this would be:
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/plants/${plantId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updateData),
    //   credentials: 'include'
    // });
    // return await response.json();

    const plant = mockPlantsData.find(p => p.id === plantId);
    if (!plant) {
      throw new Error('Plant not found');
    }

    Object.assign(plant, updateData);
    return plant;
  } catch (error) {
    console.error('Update plant API error:', error);
    throw error;
  }
}

/**
 * Create a new plant record
 * @param {Object} plantData - Plant data (nickname, plant_name, etc.)
 * @returns {Promise<Object>} Created plant object
 * 
 * LIVE BACKEND INTEGRATION:
 * Replace this function to call your actual backend endpoint:
 * - POST /api/plants
 * - Send plant object
 * - Return created plant with ID
 */
export async function createPlant(plantData) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // MOCK DATA: Create new plant
    // In production, this would be:
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/plants`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(plantData),
    //   credentials: 'include'
    // });
    // return await response.json();

    const newPlant = {
      id: `plant_${Date.now()}`,
      growth_logs: [],
      health_score: 75,
      disease_status: 'Healthy',
      last_watered: new Date().toISOString().split('T')[0],
      ...plantData
    };

    mockPlantsData.push(newPlant);
    return newPlant;
  } catch (error) {
    console.error('Create plant API error:', error);
    throw error;
  }
}
