/**
 * Prediction API Wrapper
 * Handles plant identification and disease detection
 */

import mockData from '../mock/mockPredict.json';
import { SUPPORTED_PLANTS } from '../types/contracts';

/**
 * Send image to backend for plant prediction
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Object>} Prediction response
 * 
 * LIVE BACKEND INTEGRATION:
 * Replace this function to call your actual backend endpoint:
 * - POST /api/predict
 * - Send FormData with image file
 * - Parse response according to PredictionResponseSchema
 */
export async function predictPlant(imageFile) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // MOCK DATA: Return sample prediction
    // In production, this would be:
    // const formData = new FormData();
    // formData.append('image', imageFile);
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
    //   method: 'POST',
    //   body: formData,
    //   credentials: 'include'
    // });
    // return await response.json();

    const prediction = { ...mockData };

    // Validate that predicted plant is in supported list
    if (!SUPPORTED_PLANTS.includes(prediction.plant_name)) {
      return {
        ...prediction,
        is_healthy: false,
        summary: `${prediction.plant_name} is not supported in this MVP. Supported plants are: ${SUPPORTED_PLANTS.join(', ')}`,
        recommended_next_step: 'Please analyze a Tomato, Potato, or Corn/Maize plant.'
      };
    }

    // Handle low confidence predictions
    if (prediction.plant_confidence < 0.5) {
      return {
        ...prediction,
        summary: 'Low confidence in plant identification. Please provide a clearer image.',
        recommended_next_step: 'Retake the photo with better lighting and focus on the leaves.'
      };
    }

    return prediction;
  } catch (error) {
    console.error('Prediction API error:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
}

/**
 * Get list of supported plants
 * @returns {Array} List of supported plant names
 */
export function getSupportedPlants() {
  return SUPPORTED_PLANTS;
}
