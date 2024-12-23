const cluster = require('cluster');
const os = require('os');
require("dotenv").config()
const express = require('express')
const routes = require('./routes')
const rateLimiter = require('./middlewares/rateLimiter');
require('./database/connection')()

const app = express()


if (cluster.isPrimary) {
    const numWorkers = os.cpus().length;
    console.log(`Master is running. Forking ${numWorkers} workers...`);

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    app.use(express.json())
    app.use(rateLimiter);
    app.use('/', routes)

    app.listen(process.env.PORT, () => {
        console.log(`Worker ${process.pid} is listening on port 3000`);
    });

    process.on('SIGTERM', () => {
        console.log(`Worker ${process.pid} received SIGTERM. Shutting down gracefully...`);
        server.close(() => {
            console.log(`Worker ${process.pid} has shut down gracefully.`);
        });
    });
}