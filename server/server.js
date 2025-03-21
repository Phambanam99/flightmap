// server/server.js
const WebSocket = require('ws');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

let vessels = [];
let flights = [];

// Generate initial mock data
function generateData() {
  for (let i = 0; i < 100000; i++) {
    vessels.push({
      id: `v${i + 1}`,
      name: `Vessel ${i + 1}`,
      type: 'cargo',
      position: {
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
      },
      speed: Math.random() * 20 + 5, // Random speed between 5 and 25 knots
      heading: Math.random() * 360, // Random heading between 0 and 360 degrees
    });
  }

  for (let i = 0; i <20000; i++) {
    flights.push({
      id: `f${i + 1}`,
      flightNumber: `Flight ${i + 1}`,
      airline: `Airline ${i + 1}`,
      type: 'Flight',
      position: {
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
      },
      speed: Math.random() * 500 + 200, // Random speed between 200 and 700 knots
      heading: Math.random() * 360, // Random heading between 0 and 360 degrees
      altitude: Math.random() * 30000 + 10000, // Random altitude between 10,000 and 40,000 feet
    });
  }
}

// Update positions based on speed and heading
function updatePositions() {
  const deltaTime = 1; // 1 second

  vessels.forEach((vessel) => {
    const distance = (vessel.speed * deltaTime) / 3600; // Convert knots to degrees
    const deltaLat = distance * Math.cos((vessel.heading * Math.PI) / 180);
    const deltaLng = distance * Math.sin((vessel.heading * Math.PI) / 180);

    vessel.position.lat += deltaLat;
    vessel.position.lng += deltaLng;

    // Wrap around logic for longitude
    if (vessel.position.lng > 180) vessel.position.lng -= 360;
    if (vessel.position.lng < -180) vessel.position.lng += 360;

    // Clamp latitude
    vessel.position.lat = Math.max(-85, Math.min(85, vessel.position.lat));
  });

  flights.forEach((flight) => {
    const distance = (flight.speed * deltaTime) / 3600; // Convert knots to degrees
    const deltaLat = distance * Math.cos((flight.heading * Math.PI) / 180);
    const deltaLng = distance * Math.sin((flight.heading * Math.PI) / 180);

    flight.position.lat += deltaLat;
    flight.position.lng += deltaLng;

    // Wrap around logic for longitude
    if (flight.position.lng > 180) flight.position.lng -= 360;
    if (flight.position.lng < -180) flight.position.lng += 360;

    // Clamp latitude
    flight.position.lat = Math.max(-85, Math.min(85, flight.position.lat));
  });
}

// Initialize data
generateData();

const CHUNK_SIZE = 1000; // Số lượng item trong mỗi chunk

// Send updates every second
setInterval(() => {
  updatePositions();

  // Gửi dữ liệu theo chunks
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      // Gửi vessels theo chunks
      for(let i = 0; i < vessels.length; i += CHUNK_SIZE) {
        const chunk = vessels.slice(i, i + CHUNK_SIZE);
        client.send(JSON.stringify({
          type: 'vessels_chunk',
          data: chunk,
          total: vessels.length,
          offset: i
        }));
      }

      // Gửi flights theo chunks
      for(let i = 0; i < flights.length; i += CHUNK_SIZE) {
        const chunk = flights.slice(i, i + CHUNK_SIZE);
        client.send(JSON.stringify({
          type: 'flights_chunk',
          data: chunk,
          total: flights.length,
          offset: i
        }));
      }
    }
  });
}, 1000);

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
