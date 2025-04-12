# 🌦️ Real-Time Weather Dashboard

A modern full-stack **MERN** application that fetches and displays real-time weather information using the **OpenWeatherMap API**. Users can search for any city, get a 5-day forecast, and enjoy a sleek responsive UI with geolocation and dark/light theme support.

🔗 **Live App**: [https://dweather.vercel.app](https://dweather.vercel.app)  
🖥️ **Backend API**: [https://weather-server-umber.vercel.app](https://weather-server-umber.vercel.app)

---

## 🚀 Features

- 🔍 Search real-time weather by **city name**
- 🌤️ Display **current temperature, conditions, humidity, wind speed**, and more
- 📅 Get a **5-day weather forecast**
- 🧠 **Search history** stored in MongoDB
- 📍 Use **geolocation** to fetch your current weather
- 🌗 Toggle between **light and dark mode**
- 📱 Fully **responsive design** for all screen sizes
- ⚠️ Smart **error handling** for invalid cities or API issues

---

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Local or Atlas)
- **API**: OpenWeatherMap API

---

## 📦 Prerequisites

Ensure you have the following installed:

- Node.js (v14+ recommended)
- npm (Node Package Manager)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [OpenWeatherMap API Key](https://openweathermap.org/api)

---

## ⚙️ Getting Started

### 🔧 Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
OPENWEATHERMAP_API_KEY=your_api_key_here
MONGODB_URI=mongodb://localhost:27017/weather-dashboard
```

Using MongoDB Atlas? Use this format:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/weather-dashboard
```

Start the backend server:

```bash
npm run dev
```

---

### 🎨 Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=https://weather-server-umber.vercel.app
REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here
```

Start the React development server:

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Usage Guide

1. Search by typing a **city name**, or use **"Use My Location"** for auto-detection.
2. Get real-time weather data + **5-day forecast**.
3. Use **dark/light mode toggle** to switch themes.
4. Click on previous cities in **search history** to reload their weather instantly.

---

## 🚀 Deployment Instructions

### 🌐 Backend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com) and connect your GitHub repo.
2. Create a new project and choose your backend root directory.
3. Configure settings:
   - **Build Command**: `cd server && npm install`
   - **Output Directory**: `server`
   - **Start Command**: `cd server && node server.js`
   - **Environment Variables**:
     - `NODE_ENV`: production
     - `OPENWEATHERMAP_API_KEY`: your_api_key
     - `MONGODB_URI`: your MongoDB Atlas URI

> ✅ Backend Live: [https://weather-server-umber.vercel.app](https://weather-server-umber.vercel.app)

---

### 🎯 Frontend Deployment (Vercel)

1. Navigate to the `client` directory:

```bash
cd client
```

2. Create or update `vercel.json`:

```json
{
  "env": {
    "REACT_APP_API_URL": "https://weather-server-umber.vercel.app"
  }
}
```

3. Deploy:

```bash
vercel login
vercel
```

4. In Vercel project settings, add environment variables:

- `REACT_APP_API_URL`: https://weather-server-umber.vercel.app  
- `REACT_APP_OPENWEATHERMAP_API_KEY`: your_api_key

> ✅ Frontend Live: [https://dweather.vercel.app](https://dweather.vercel.app)

---

## 🎁 Bonus Features

- ✅ MongoDB Search History
- ✅ 5-Day Weather Forecast
- ✅ Geolocation Support
- ✅ Light/Dark Theme Toggle
- ✅ Full Deployment Guide

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify!
