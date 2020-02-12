// greet.js
const express = require('express');
module.exports = function(options = {}) { // Router factory
    const router = express.Router();
    const {service} = options;
    router.get('/', (req, res, next) => {
        res.end(service.createGreeting(req.query.name || 'Stranger'));
            });
        
        return router;
};