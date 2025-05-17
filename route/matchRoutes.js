const Router = require('express').Router;
const matchController = require('../controller/matchController');

const router = new Router();

/**
 * @swagger
 * /api/matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_time
 *             properties:
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 description: Match start time
 *               status:
 *                 type: string
 *                 enum: [scheduled, live, completed, canceled]
 *                 default: scheduled
 *                 description: Match status
 *     responses:
 *       201:
 *         description: The match was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Invalid request body
 */
router.post('/', matchController.create);

/**
 * @swagger
 * /api/matches:
 *   get:
 *     summary: Get all matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: List of all matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get('/', matchController.getAll);

/**
 * @swagger
 * /api/matches/{id}:
 *   get:
 *     summary: Get a match by id
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The match id
 *     responses:
 *       200:
 *         description: Match found with participants
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Match'
 *                 - type: object
 *                   properties:
 *                     participants:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Participant'
 *       404:
 *         description: Match not found
 */
router.get('/:id', matchController.getOne);

/**
 * @swagger
 * /api/matches/{id}:
 *   put:
 *     summary: Update a match
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The match id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 description: Match start time
 *               status:
 *                 type: string
 *                 enum: [scheduled, live, completed, canceled]
 *                 description: Match status
 *     responses:
 *       200:
 *         description: The match was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       404:
 *         description: Match not found
 */
router.put('/:id', matchController.update);

/**
 * @swagger
 * /api/matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The match id
 *     responses:
 *       200:
 *         description: The match was deleted
 *       404:
 *         description: Match not found
 */
router.delete('/:id', matchController.delete);

module.exports = router; 