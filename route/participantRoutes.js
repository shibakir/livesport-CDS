const Router = require('express');
const participantController = require('../controller/participantController');

const router = new Router();

/**
 * @swagger
 * /api/participants:
 *   post:
 *     summary: Create a new participant
 *     tags: [Participants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - match_id
 *               - participant_type
 *             properties:
 *               match_id:
 *                 type: integer
 *                 description: The ID of the match
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team (required if participant_type is 'team')
 *               single_id:
 *                 type: integer
 *                 description: The ID of the single participant (required if participant_type is 'single')
 *               participant_type:
 *                 type: string
 *                 enum: [team, single]
 *                 description: Type of participant
 *               score:
 *                 type: integer
 *                 default: 0
 *                 description: The current score of the participant
 *     responses:
 *       201:
 *         description: The participant was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       400:
 *         description: Invalid request body
 */
router.post('/', participantController.create);

/**
 * @swagger
 * /api/participants:
 *   get:
 *     summary: Get all participants
 *     tags: [Participants]
 *     parameters:
 *       - in: query
 *         name: match_id
 *         schema:
 *           type: integer
 *         description: The match ID to filter participants by (optional)
 *     responses:
 *       200:
 *         description: List of all participants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participant'
 */
router.get('/', participantController.getAll);

/**
 * @swagger
 * /api/participants/{id}:
 *   get:
 *     summary: Get a participant by ID
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The participant ID
 *     responses:
 *       200:
 *         description: Participant found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       404:
 *         description: Participant not found
 */
router.get('/:id', participantController.getOne);

/**
 * @swagger
 * /api/participants/{id}:
 *   put:
 *     summary: Update a participant
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The participant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               match_id:
 *                 type: integer
 *                 description: The ID of the match
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team
 *               single_id:
 *                 type: integer
 *                 description: The ID of the single participant
 *               participant_type:
 *                 type: string
 *                 enum: [team, single]
 *                 description: Type of participant
 *               score:
 *                 type: integer
 *                 description: The current score of the participant
 *     responses:
 *       200:
 *         description: The participant was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       404:
 *         description: Participant not found
 */
router.put('/:id', participantController.update);

/**
 * @swagger
 * /api/participants/{id}:
 *   delete:
 *     summary: Delete a participant
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The participant ID
 *     responses:
 *       200:
 *         description: The participant was deleted
 *       404:
 *         description: Participant not found
 */
router.delete('/:id', participantController.delete);

module.exports = router; 