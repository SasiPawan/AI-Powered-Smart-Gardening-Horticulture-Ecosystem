/**
 * GrowthLogForm Component
 * Form for adding growth observations
 */

import React, { useState } from 'react';
import './GrowthLogForm.css';

export default function GrowthLogForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    description: '',
    plant_height: '',
    leaf_count: '',
    observation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!formData.plant_height || isNaN(formData.plant_height)) {
      alert('Please enter a valid plant height');
      return;
    }

    if (!formData.leaf_count || isNaN(formData.leaf_count)) {
      alert('Please enter a valid leaf count');
      return;
    }

    onSubmit(formData);
    
    // Reset form
    setFormData({
      description: '',
      plant_height: '',
      leaf_count: '',
      observation: ''
    });
  };

  return (
    <form className="growth-log-form" onSubmit={handleSubmit}>
      <div className="form-title">Log Plant Growth</div>

      <div className="form-group">
        <label className="form-label">Description *</label>
        <input
          type="text"
          name="description"
          className="form-input"
          placeholder="e.g., Weekly check-in, flowering started"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Plant Height (cm) *</label>
          <input
            type="number"
            name="plant_height"
            className="form-input"
            placeholder="Height in cm"
            value={formData.plant_height}
            onChange={handleChange}
            disabled={isLoading}
            min="0"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Leaf Count *</label>
          <input
            type="number"
            name="leaf_count"
            className="form-input"
            placeholder="Number of leaves"
            value={formData.leaf_count}
            onChange={handleChange}
            disabled={isLoading}
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Observations</label>
        <textarea
          name="observation"
          className="form-textarea"
          placeholder="Any notes about the plant's condition, changes noticed, etc."
          value={formData.observation}
          onChange={handleChange}
          disabled={isLoading}
          rows="3"
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Growth Log'}
      </button>
    </form>
  );
}
