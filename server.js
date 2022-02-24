// import express from node modules core module doesn't need file path
const express = require('express');

// local host and port
const hostname = 'localhost';
const port = 3000;

// express server application
const app = express();

// returns the same response for any request
// callback is middleware in express
app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// start server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});