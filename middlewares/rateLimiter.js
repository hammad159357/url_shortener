const rateLimit = require('express-rate-limit');

// (limit to 100 requests per IP address within 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
    headers: true,
});

module.exports = limiter;
