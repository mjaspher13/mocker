const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Load mock data from JSON file
const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json'), 'utf8'));

// Function to set up mock routes
const setupMockRoutes = (app, mockData) => {
    mockData.resources.forEach(resource => {
        if (resource.type === 'MockRoute') {
            const route = resource;

            app[route.method.toLowerCase()](route.name, (req, res) => {
                res.set(route.headers.reduce((headers, header) => {
                    headers[header.name] = header.value;
                    return headers;
                }, {}));
                res.status(route.statusCode).send(route.body);
            });

            console.log(`Mock route setup: [${route.method}] ${route.name}`);
        }
    });
};

// Set up the routes
setupMockRoutes(app, mockData);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
