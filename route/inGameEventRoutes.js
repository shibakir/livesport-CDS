const Router = require('express');
const inGameEventController = require('../controller/inGameEventController');

const router = new Router();

/**
 * @swagger
 * /api/in-game-events:
 *   post:
 *     summary: Create a new in-game event
 *     tags: [InGameEvents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_type_id
 *               - match_id
 *               - participant_id
 *               - timestamp_sec
 *             properties:
 *               event_type_id:
 *                 type: integer
 *                 description: The ID of the event type
 *               match_id:
 *                 type: integer
 *                 description: The ID of the match
 *               participant_id:
 *                 type: integer
 *                 description: The ID of the participant who performed the event
 *               timestamp_sec:
 *                 type: integer
 *                 description: The time of the event in seconds from match start
 *     responses:
 *       201:
 *         description: The in-game event was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InGameEvent'
 *       400:
 *         description: Invalid request body
 */
router.post('/', inGameEventController.create);

/**
 * @swagger
 * /api/in-game-events:
 *   get:
 *     summary: Get all in-game events
 *     tags: [InGameEvents]
 *     parameters:
 *       - in: query
 *         name: match_id
 *         schema:
 *           type: integer
 *         description: The match ID to filter events by (optional)
 *     responses:
 *       200:
 *         description: List of all in-game events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InGameEvent'
 */
router.get('/', inGameEventController.getAll);

/**
 * @swagger
 * /api/in-game-events/{id}:
 *   get:
 *     summary: Get an in-game event by ID
 *     tags: [InGameEvents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The in-game event ID
 *     responses:
 *       200:
 *         description: In-game event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InGameEvent'
 *       404:
 *         description: In-game event not found
 */
router.get('/:id', inGameEventController.getOne);

/**
 * @swagger
 * /api/in-game-events/{id}:
 *   put:
 *     summary: Update an in-game event
 *     tags: [InGameEvents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The in-game event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_type_id:
 *                 type: integer
 *                 description: The ID of the event type
 *               match_id:
 *                 type: integer
 *                 description: The ID of the match
 *               participant_id:
 *                 type: integer
 *                 description: The ID of the participant who performed the event
 *               timestamp_sec:
 *                 type: integer
 *                 description: The time of the event in seconds from match start
 *     responses:
 *       200:
 *         description: The in-game event was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InGameEvent'
 *       404:
 *         description: In-game event not found
 */
router.put('/:id', inGameEventController.update);

/**
 * @swagger
 * /api/in-game-events/{id}:
 *   delete:
 *     summary: Delete an in-game event
 *     tags: [InGameEvents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The in-game event ID
 *     responses:
 *       200:
 *         description: The in-game event was deleted
 *       404:
 *         description: In-game event not found
 */
router.delete('/:id', inGameEventController.delete);

module.exports = router; 