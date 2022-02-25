// import express
const express = require('express');
// object we can use express routing methods
const campsiteRouter = express.Router();

// Router object methods are chained instead of called separately 
campsiteRouter.route('/')
.all((req, res, next) => {
    // ALL HTTP Verbs
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    // GET request
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    // Post request
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    //PUT request
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    // DELETE request
    res.end('Deleting all campsites');
});

// export the router
module.exports = campsiteRouter;