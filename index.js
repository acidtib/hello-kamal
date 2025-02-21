const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// health check endpoint
app.get('/up', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// add an endpoint to get versions
app.get('/versions', (req, res) => {
  res.json({
    nodejs: process.version,
    express: require('express/package.json').version
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
