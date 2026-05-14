/**
 * Recommendation API Wrapper
 * Handles care and maintenance recommendations
 */

import mockData from '../mock/mockRecommend.json';

/**
 * Get care recommendations for a detected plant
 * @param {string} plantName - The plant name (Tomato, Potato, Corn/Maize)
 * @returns {Promise<Object>} Care recommendation response
 * 
 * LIVE BACKEND INTEGRATION:
 * Replace this function to call your actual backend endpoint:
 * - POST /api/recommend
 * - Send { plant_name: "Tomato" }
 * - Parse response according to CareResponseSchema
 */
export async function getCareRecommendations(plantName) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // MOCK DATA: Return sample recommendations
    // In production, this would be:
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/recommend`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ plant_name: plantName }),
    //   credentials: 'include'
    // });
    // return await response.json();

    // For demo: return mock data matching the requested plant
    if (plantName === mockData.plant_name) {
      return mockData;
    }

    // For other plants, generate mock recommendations
    return generateMockRecommendation(plantName);
  } catch (error) {
    console.error('Recommendation API error:', error);
    throw new Error('Failed to get care recommendations. Please try again.');
  }
}

/**
 * Generate mock recommendation for any plant
 * @private
 */
function generateMockRecommendation(plantName) {
  const recommendations = {
    'Potato': {
      plant_name: 'Potato',
      health_status: 'Healthy',
      health_score: 85,
      watering_advice: 'Keep soil consistently moist but not waterlogged. Potatoes need about 1-2 inches of water per week.',
      fertilizer_advice: 'Use balanced fertilizer at planting. Potatoes are heavy feeders; side-dress with nitrogen during growth.',
      soil_advice: 'Loose, well-draining loamy soil is ideal. Mulch with straw to keep soil cool and suppress weeds.',
      sunlight_advice: 'Full sun (6+ hours) for optimal growth and yield. Can tolerate partial shade.',
      care_tips: [
        'Hill soil around plants as they grow to prevent light exposure of tubers',
        'Monitor for Colorado potato beetles and other pests',
        'Avoid overhead watering to prevent disease',
        'Plant in cool season for best results'
      ],
      warnings: [],
      next_steps: [
        'Monitor for pest activity',
        'Ensure adequate soil moisture during tuber development',
        'Plan harvest timing (typically 2-3 months after planting)',
        'Log growth observations regularly'
      ]
    },
    'Corn/Maize': {
      plant_name: 'Corn/Maize',
      health_status: 'Healthy',
      health_score: 90,
      watering_advice: 'Provide 1-1.5 inches of water weekly through rainfall or irrigation. Critical during tasseling and silking.',
      fertilizer_advice: 'Corn is a heavy nitrogen feeder. Apply nitrogen at V4-V6 stage and again before tasseling.',
      soil_advice: 'Rich, well-draining loamy soil with good organic matter content. Corn prefers slightly acidic to neutral pH.',
      sunlight_advice: 'Full sun (8+ hours). Corn requires strong sunlight for optimal photosynthesis and growth.',
      care_tips: [
        'Thin seedlings to 8-12 inches apart for air circulation',
        'Mulch around plants to retain moisture and suppress weeds',
        'Watch for common pests like corn borers and armyworms',
        'Provide support for tall varieties to prevent lodging'
      ],
      warnings: [],
      next_steps: [
        'Monitor for insect pests regularly',
        'Check silk emergence for pollination stage',
        'Plan for support structures if needed',
        'Track growth milestones (V-stages)'
      ]
    }
  };

  return recommendations[plantName] || {
    plant_name: plantName,
    health_status: 'Unknown',
    health_score: 0,
    watering_advice: 'Standard care: maintain consistent soil moisture.',
    fertilizer_advice: 'Follow general plant care guidelines.',
    soil_advice: 'Well-draining soil with organic matter.',
    sunlight_advice: 'Most plants prefer 6+ hours of sunlight daily.',
    care_tips: [],
    warnings: ['Limited data available for this plant'],
    next_steps: ['Seek additional plant-specific care information']
  };
}
