const Router = require('express').Router;
const singleController = require('../controller/singleController');

const router = new Router();

/**
 * @swagger
 * /api/singles:
 *   post:
 *     summary: Create a new single participant
 *     tags: [Singles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - person_id
 *             properties:
 *               person_id:
 *                 type: integer
 *                 description: The ID of the person
 *     responses:
 *       201:
 *         description: The single participant was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Single'
 *       400:
 *         description: Invalid request body
 */
router.post('/', singleController.create);

/**
 * @swagger
 * /api/singles:
 *   get:
 *     summary: Get all single participants
 *     tags: [Singles]
 *     responses:
 *       200:
 *         description: List of all single participants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Single'
 */
router.get('/', singleController.getAll);

/**
 * @swagger
 * /api/singles/{id}:
 *   get:
 *     summary: Get a single participant by ID
 *     tags: [Singles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The single participant ID
 *     responses:
 *       200:
 *         description: Single participant found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Single'
 *       404:
 *         description: Single participant not found
 */
router.get('/:id', singleController.getOne);

/**
 * @swagger
 * /api/singles/{id}:
 *   put:
 *     summary: Update a single participant
 *     tags: [Singles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The single participant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               person_id:
 *                 type: integer
 *                 description: The ID of the person
 *     responses:
 *       200:
 *         description: The single participant was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Single'
 *       404:
 *         description: Single participant not found
 */
router.put('/:id', singleController.update);

/**
 * @swagger
 * /api/singles/{id}:
 *   delete:
 *     summary: Delete a single participant
 *     tags: [Singles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The single participant ID
 *     responses:
 *       200:
 *         description: The single participant was deleted
 *       404:
 *         description: Single participant not found
 */
router.delete('/:id', singleController.delete);

module.exports = router; 