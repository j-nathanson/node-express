// import express and morgan middleware from node modules core module doesn't need file path
const express = require('express');
const morgan = require('morgan');

// local host and port
const hostname = 'localhost';
const port = 3000;

// express server application, use morgan middle ware for development? Morgan will log header info
// .json will parse data from JSON to js properties
const app = express();
app.use(morgan('dev'));
app.use(express.json());

// catch all for all HTTP verbs, takes path as first parameter, callback as second param. Will send plain text in the body. next() will pass control of the app routing to the next relevant method
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

// GET request for all campsites, status code and header already set by the all method. No routing afterwards so we use end()
app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

// POST request. Data used will be from the express.json() parsing. takes properties from the JSON data and set them up as properties of the req.body js object. Right now just echoing the information
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

// PUT request. Change the status code to not supported and display a message
app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

// DELETE request.
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

// GET request for specific campsite. the value of ':campsiteId' is stored in req.params.campsiteId
app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

// POST request for specific campsite. Not supported but will set up a response.
app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

// PUT request for specific campsite. Echo to the user what will be updated
app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

// DELETE request for specific campsite.
app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

// express.static serves static files and is based on serve-static.
// __dirname absolute path of the current directory of the file we are in
// will automatically serve index.html on a get request
// for files not in public folder it will just serve the 'this is an express server html'
app.use(express.static(__dirname + '/public'));

// returns the same response for any request
// callback is middleware in express
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// start server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});