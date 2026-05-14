# Plant Health Dashboard - Frontend MVP

A React + Vite frontend application for plant disease detection and care management. This is a hackathon MVP that demonstrates AI-powered plant analysis with a clean, modern UI.

## Features

✨ **Core Features:**
- **Image Upload** - Upload plant photos for instant analysis
- **Plant Identification** - AI-powered recognition with confidence scores
- **Disease Detection** - Detect plant diseases and health issues
- **Care Recommendations** - Personalized watering, fertilizer, and soil guidance
- **Plant Dashboard** - Track multiple plants and their health status
- **Growth Tracking** - Log growth milestones and monitor plant progress
- **Health Monitoring** - Real-time health score and status visualization

🌱 **Supported Plants (MVP):**
- Tomato
- Potato
- Corn/Maize

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router 6** - Client-side routing
- **CSS3** - Modern, responsive styling
- **JavaScript ES6+** - Application logic

## Project Structure

```
frontend/
├── src/
│   ├── api/                  # API wrapper functions
│   │   ├── predictApi.js     # Plant prediction API
│   │   ├── recommendApi.js   # Care recommendations API
│   │   └── plantsApi.js      # Plant dashboard API
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── ImageUploader.jsx
│   │   ├── PredictionCard.jsx
│   │   ├── CareCard.jsx
│   │   ├── HealthBadge.jsx
│   │   ├── GrowthLogForm.jsx
│   │   ├── GrowthHistory.jsx
│   │   ├── SupportedPlantsBanner.jsx
│   │   └── *.css             # Component styles
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Analyze.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PlantDetails.jsx
│   │   └── *.css             # Page styles
│   ├── mock/                 # Mock data for testing
│   │   ├── mockPredict.json
│   │   ├── mockRecommend.json
│   │   └── mockPlants.json
│   ├── types/                # Type definitions and contracts
│   │   └── contracts.js
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies and scripts
├── .gitignore
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment** (optional):
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## API Integration

All API calls are isolated in the `src/api/` directory. Currently using mock data from `src/mock/` for demo purposes.

### Prediction API (`predictApi.js`)
```javascript
import { predictPlant } from './api/predictApi';

// Send image file to backend
const prediction = await predictPlant(imageFile);
// Response: { plant_name, plant_confidence, disease_name, disease_confidence, is_healthy, summary, recommended_next_step }
```

**LIVE INTEGRATION:** Replace the fetch call in `predictApi.js` to connect to your actual backend:
```javascript
// POST /api/predict with FormData containing image file
```

### Recommendations API (`recommendApi.js`)
```javascript
import { getCareRecommendations } from './api/recommendApi';

// Get care recommendations for a plant
const care = await getCareRecommendations('Tomato');
// Response: { plant_name, health_status, health_score, watering_advice, fertilizer_advice, ... }
```

**LIVE INTEGRATION:** Replace the fetch call in `recommendApi.js`:
```javascript
// POST /api/recommend with { plant_name: "Tomato" }
```

### Plants API (`plantsApi.js`)
```javascript
import { 
  getAllPlants, 
  getPlantById, 
  addGrowthLog, 
  updatePlant, 
  createPlant 
} from './api/plantsApi';
```

**LIVE INTEGRATION:** Each function has comments showing the required endpoints:
```javascript
// GET /api/plants
// GET /api/plants/:id
// POST /api/plants/:id/growth-logs
// PATCH /api/plants/:id
// POST /api/plants
```

## API Contracts

### Plant Prediction Response
```json
{
  "plant_name": "Tomato",
  "plant_confidence": 0.94,
  "disease_name": "Early Blight",
  "disease_confidence": 0.89,
  "is_healthy": false,
  "summary": "Possible early blight detected on tomato leaf.",
  "recommended_next_step": "Reduce leaf wetness and inspect surrounding leaves."
}
```

### Care Recommendation Response
```json
{
  "plant_name": "Tomato",
  "health_status": "Needs Attention",
  "health_score": 62,
  "watering_advice": "Water when top 2 cm of soil feels dry.",
  "fertilizer_advice": "Use balanced NPK fertilizer once every 2 weeks.",
  "soil_advice": "Well-draining loamy soil with compost is recommended.",
  "sunlight_advice": "Provide 6 to 8 hours of sunlight daily.",
  "care_tips": [],
  "warnings": [],
  "next_steps": []
}
```

### Plant Object
```json
{
  "id": "plant_001",
  "nickname": "Balcony Tomato",
  "plant_name": "Tomato",
  "disease_status": "Early Blight",
  "health_score": 62,
  "last_watered": "2026-05-13",
  "growth_logs": [
    {
      "id": "log_001",
      "date": "2026-05-01",
      "description": "Initial planting",
      "plant_height": 15,
      "leaf_count": 8,
      "observation": "Plant looks healthy, no visible issues."
    }
  ]
}
```

## Demo Flow (Under 3 minutes)

1. **Home Page** (15 seconds)
   - See project intro and supported plants banner
   - Click "Get Started" button

2. **Analyze Page** (1-2 minutes)
   - Upload or drag-drop a plant image
   - See prediction results (plant name, confidence, disease detection)
   - View personalized care recommendations

3. **Dashboard** (30 seconds)
   - See overview of all tracked plants
   - View health scores and status
   - Click to see plant details

4. **Plant Details** (15-30 seconds)
   - View plant overview with health visualization
   - Log plant growth (height, leaf count, observations)
   - See growth history timeline

## Styling

The app uses a modern, gradient-based color scheme:
- **Primary:** #667eea → #764ba2 (Purple-Blue Gradient)
- **Success:** #28a745 (Green)
- **Warning:** #ffc107 (Yellow)
- **Danger:** #dc3545 (Red)

All styles are in CSS with responsive design for mobile, tablet, and desktop devices.

## Component Highlights

### ImageUploader
- Drag-and-drop support
- File validation (image type, max 5MB)
- Visual feedback during upload

### PredictionCard
- Confidence visualization with progress bars
- Plant identification results
- Disease detection with confidence levels
- Recommended next steps

### CareCard
- Health score display (0-100)
- Color-coded health status
- Detailed care instructions (watering, fertilizer, soil, sunlight)
- Care tips and warnings
- Actionable next steps

### GrowthHistory
- Timeline visualization of growth logs
- Height and leaf count tracking
- User observations
- Date-based sorting (newest first)

## State Management

Currently using React hooks (useState, useEffect) for component-level state. For larger scale:
- Consider Redux or Zustand for global state
- Cache API responses
- Implement optimistic updates

## Error Handling

All pages include:
- Loading states with spinner animation
- Error states with user-friendly messages
- Empty states with helpful prompts
- Graceful fallbacks

## Deployment

### Production Build
```bash
npm run build
# Creates optimized build in dist/
```

### Deployment Options
- **Vercel** (Recommended for Vite)
- **Netlify**
- **GitHub Pages**
- **Traditional hosting** (Node.js or static server)

## Future Enhancements

- [ ] Authentication and user accounts
- [ ] Backend API integration
- [ ] Image optimization and caching
- [ ] Offline support with service workers
- [ ] Push notifications for care reminders
- [ ] Export plant care reports
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Advanced analytics dashboard
- [ ] IoT sensor integration

## Contributing

This is a hackathon MVP. Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit pull requests
4. Report issues

## License

MIT License - Feel free to use this code for your project.

## Support

For issues or questions:
- Check the API wrapper comments for backend integration points
- Review mock data in `src/mock/` for expected response formats
- See `src/types/contracts.js` for data structure definitions

---

**Built for Hackathon MVP** 🌱
Demonstrates AI plant analysis with React + Vite frontend
