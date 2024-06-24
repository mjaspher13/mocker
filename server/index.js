const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, process.env.MOCK_DATA_FILE), 'utf8'));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ['content-type', 'X-Traceability-Id']
}));

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

setupMockRoutes(app, mockData);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
