const Router = require('express');
const inGameEventRoutes = require('./inGameEventRoutes');
const matchRoutes = require('./matchRoutes');
const teamRoutes = require('./teamRoutes');
const singleRoutes = require('./singleRoutes');
const participantRoutes = require('./participantRoutes');

const router = new Router();

router.use('/api/events', inGameEventRoutes);
router.use('/api/matches', matchRoutes);
router.use('/api/teams', teamRoutes);
router.use('/api/singles', singleRoutes);
router.use('/api/participants', participantRoutes);
router.use('/api/in-game-events', inGameEventRoutes);

module.exports = router; 