# 📊 Advanced Real-Time Sales Analytics System

A backend system built with Node.js, Express, Sequelize, and MySQL. It provides real-time sales analytics, integrates AI recommendations using Gemini, and adjusts drink prices dynamically based on weather and season.

---

## 🔗 GitHub Repository

**URL:** [https://github.com/Nadaeidmohammed/Task1_PV](https://github.com/Nadaeidmohammed/Task1_PV)

---

## ⚙️ Setup Steps

### 🐳 Docker Setup

1. Make sure Docker is installed and running.
2. In the project directory, run:
   ```bash
   docker-compose up --d


Access the backend on http://localhost:3000

Install dependencies:
npm install

Start the project:
npm run dev

| Feature                               | Implemented By       |
| ------------------------------------- | -------------------- |
| 🎯 Product recommendations            | ✅ AI (Gemini API)    |
| 🌦️ Weather-based price adjustments   | ✅ Manual logic       |
| 📈 Real-time analytics via WebSocket  | ✅ Manual (WebSocket) |
| 🧾 Order creation and summary reports | ✅ Manual             |



GET /api/weather-suggestion
Expected Output:
{
  "weather": {
    "temp": 33,
    "weather": "Clear"
  },
  "suggestion": "It's hot! Promote cold drinks like juices and iced coffee."
}
Test Using: Postman 
