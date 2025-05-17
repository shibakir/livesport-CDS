const { inGameEventService } = require('../service');
const ApiError = require('../exceptions/apiError');

class InGameEventController {
    async create(req, res, next) {
        try {
            const { match_id, event_type_id, participant_id, minute, description } = req.body;
            const inGameEvent = await inGameEventService.create(
                match_id, 
                event_type_id, 
                participant_id, 
                minute, 
                description
            );
            return res.status(201).json(inGameEvent);
        } catch (e) {
            next(ApiError.badRequest('Error creating in-game event', e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const inGameEvents = await inGameEventService.getAll();
            return res.json(inGameEvents);
        } catch (e) {
            next(ApiError.internal('Error getting in-game events', e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const inGameEvent = await inGameEventService.getOne(id);
            return res.json(inGameEvent);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { match_id, event_type_id, participant_id, minute, description } = req.body;
            
            const inGameEvent = await inGameEventService.update(
                id, 
                match_id, 
                event_type_id, 
                participant_id, 
                minute, 
                description
            );
            
            return res.json(inGameEvent);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await inGameEventService.delete(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new InGameEventController(); 