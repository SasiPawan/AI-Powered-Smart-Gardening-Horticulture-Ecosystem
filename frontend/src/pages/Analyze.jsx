/**
 * Analyze Page
 * Plant analysis with image upload and results display
 */

import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import PredictionCard from '../components/PredictionCard';
import CareCard from '../components/CareCard';
import SupportedPlantsBanner from '../components/SupportedPlantsBanner';
import { predictPlant } from '../api/predictApi';
import { getCareRecommendations } from '../api/recommendApi';
import './Analyze.css';

export default function Analyze() {
  const [prediction, setPrediction] = useState(null);
  const [care, setCare] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [careLoading, setCareLoading] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  const [careError, setCareError] = useState(null);

  const handleImageSelected = async (imageFile) => {
    setPredictionLoading(true);
    setPredictionError(null);
    setPrediction(null);
    setCare(null);

    try {
      // Get prediction from API
      const predictionResult = await predictPlant(imageFile);
      setPrediction(predictionResult);

      // If prediction is successful and plant is supported, get care recommendations
      if (predictionResult && predictionResult.plant_name) {
        setCareLoading(true);
        setCareError(null);
        try {
          const careResult = await getCareRecommendations(predictionResult.plant_name);
          setCare(careResult);
        } catch (error) {
          setCareError(error.message);
        } finally {
          setCareLoading(false);
        }
      }
    } catch (error) {
      setPredictionError(error.message);
    } finally {
      setPredictionLoading(false);
    }
  };

  return (
    <div className="analyze-page">
      <div className="page-header">
        <h1>Analyze Plant Health</h1>
        <p>Upload an image of your plant to detect diseases and get care recommendations</p>
      </div>

      <div className="container">
        <SupportedPlantsBanner />

        <div className="analyze-layout">
          <div className="upload-section">
            <ImageUploader
              onImageSelected={handleImageSelected}
              isLoading={predictionLoading}
            />
          </div>

          <div className="results-section">
            <PredictionCard
              prediction={prediction}
              isLoading={predictionLoading}
              error={predictionError}
            />

            {prediction && !predictionError && (
              <CareCard
                care={care}
                isLoading={careLoading}
                error={careError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
