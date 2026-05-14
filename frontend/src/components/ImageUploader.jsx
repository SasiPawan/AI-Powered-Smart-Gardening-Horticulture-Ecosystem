/**
 * ImageUploader Component
 * Handles image upload for plant analysis
 */

import React, { useRef } from 'react';
import './ImageUploader.css';

export default function ImageUploader({ onImageSelected, isLoading }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      onImageSelected(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-active');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-active');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-active');
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        onImageSelected(file);
      } else {
        alert('Please drop an image file');
      }
    }
  };

  return (
    <div
      className="image-uploader"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isLoading}
        hidden
      />
      
      <div className="uploader-content">
        <div className="uploader-icon">📸</div>
        <h3>Upload Plant Image</h3>
        <p>Click or drag an image here</p>
        <button
          className="btn btn-primary"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Choose Image'}
        </button>
        <p className="uploader-hint">JPG, PNG, WebP up to 5MB</p>
      </div>
    </div>
  );
}
