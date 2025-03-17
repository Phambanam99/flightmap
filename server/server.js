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
  vessels = [
    {
      id: 'v1',
      name: 'Cargo Vessel 1',
      type: 'cargo',
      position: {
        lat: 25.7617,
        lng: -80.1918
      },
      speed: 12,
      heading: 90
    },
    {
      id: 'v2',
      name: 'Tanker Vessel 2',
      type: 'tanker',
      position: {
        lat: 40.7128,
        lng: -74.0060
      },
      speed: 15,
      heading: 180
    }
  ];

  flights = [
    {
      id: 'f1',
      flightNumber: 'AA123',
      airline: 'American Airlines',
      type: 'Vessel',
      position: {
        lat: 34.0522,
        lng: -118.2437
      },
      speed: 500,
      heading: 90,
      altitude: 35000
    },
    {
      id: 'f2',
      flightNumber: 'UA456',
      airline: 'United Airlines',
      type: 'Flight',
      position: {
        lat: 41.8781,
        lng: -87.6298
      },
      speed: 550,
      heading: 270,
      altitude: 38000
    }
  ];
}

// Update positions based on speed and heading
function updatePositions() {
  const deltaTime = 1; // 1 second

  vessels.forEach(vessel => {
    const distance = vessel.speed * deltaTime / 3600; // Convert knots to degrees
    const deltaLat = distance * Math.cos(vessel.heading * Math.PI / 180);
    const deltaLng = distance * Math.sin(vessel.heading * Math.PI / 180);

    vessel.position.lat += deltaLat;
    vessel.position.lng += deltaLng;

    // Wrap around logic for longitude
    if (vessel.position.lng > 180) vessel.position.lng -= 360;
    if (vessel.position.lng < -180) vessel.position.lng += 360;

    // Clamp latitude
    vessel.position.lat = Math.max(-85, Math.min(85, vessel.position.lat));
  });

  flights.forEach(flight => {
    const distance = flight.speed * deltaTime / 3600; // Convert knots to degrees
    const deltaLat = distance * Math.cos(flight.heading * Math.PI / 180);
    const deltaLng = distance * Math.sin(flight.heading * Math.PI / 180);

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

// Send updates every second
setInterval(() => {
  updatePositions();
  const data = { vessels, flights };
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}, 1000);

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
