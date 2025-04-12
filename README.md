# Real-Time Weather Dashboard

A full-stack MERN application that allows users to fetch and display real-time weather data from the OpenWeatherMap API.

## Features

- Search for weather data by city name
- Display of current temperature, weather conditions, humidity, wind speed, and more
- 5-day weather forecast
- Search history with MongoDB integration
- Geolocation to automatically detect user's location
- Light/dark mode toggle
- Responsive design that works on both desktop and mobile devices
- Error handling for invalid city names or API issues

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API**: OpenWeatherMap API

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14+ recommended)
- npm (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas account)
- OpenWeatherMap API key (get it from [OpenWeatherMap](https://openweathermap.org/api))

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory and add your configuration:
   ```
   PORT=5000
   OPENWEATHERMAP_API_KEY=your_api_key_here
   MONGODB_URI=mongodb://localhost:27017/weather-dashboard
   ```
   
   Note: If you're using MongoDB Atlas, your connection string will look like:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/weather-dashboard
   ```

4. Start the server:
   ```
   npm run dev
   ```
   This will start the server in development mode with auto-reloading.

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

4. Start the React development server:
   ```
   npm start
   ```
   This will open the application in your default browser at http://localhost:3000.

## Usage

1. Enter a city name in the search bar or use the "Use My Location" button
2. View the current weather information and 5-day forecast
3. Toggle between light and dark mode using the theme button
4. Click on any city in your search history to quickly view its weather again

## Deployment

### Backend Deployment to Render

1. Create a Render account at https://render.com/
2. Connect your GitHub repository to Render
3. Create a new Web Service and select your repository
4. Configure your service:
   - **Name**: weather-dashboard-api
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node server.js`
   - **Environment Variables**: Add the following:
     - `PORT`: 10000 (Render assigns the port)
     - `NODE_ENV`: production
     - `OPENWEATHERMAP_API_KEY`: Your API key
     - `MONGODB_URI`: Your MongoDB connection URI (preferably MongoDB Atlas)
5. Click "Create Web Service"

Alternatively, you can use the provided `render.yaml` file for deployment.

### Frontend Deployment to Vercel

1. Create a Vercel account at https://vercel.com/
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Navigate to the client directory:
   ```
   cd client
   ```

4. Update the `vercel.json` file with the correct backend URL:
   ```json
   {
     "env": {
       "REACT_APP_API_URL": "https://your-render-app-name.onrender.com"
     }
   }
   ```

5. Deploy to Vercel:
   ```
   vercel login
   vercel
   ```

6. Follow the prompts to complete the deployment
7. Add your environment variables in the Vercel project settings:
   - `REACT_APP_API_URL`: https://your-render-app-name.onrender.com
   - `REACT_APP_OPENWEATHERMAP_API_KEY`: Your API key

## Bonus Features Implemented

- ✅ MongoDB integration for search history
- ✅ 5-day forecast feature
- ✅ Geolocation for automatic location detection
- ✅ Light/dark mode toggle
- ✅ Deployment instructions for Render (backend) and Vercel (frontend)

## License

This project is licensed under the MIT License.