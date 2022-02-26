// import express and morgan middleware from node modules core module doesn't need file path.
// import the campsiteROuter object from the directory
const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

// local host and port
const hostname = 'localhost';
const port = 3000;

// express server application, use morgan middle ware for development? Morgan will log header info
// .json will parse data from JSON to js properties
const app = express();
app.use(morgan('dev'));
app.use(express.json());

// provide route paths
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

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