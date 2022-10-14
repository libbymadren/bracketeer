const express = require('express');
const router = express.Router();

// import the two routers for the api and frontend
const apiRouter = require('./api/APIRoutes');
const frontendRouter = require('./frontend/FrontendRoutes')

// tell the router to use the frontend and api routers
router.use(frontendRouter);
router.use('/api', apiRouter);

module.exports = router;