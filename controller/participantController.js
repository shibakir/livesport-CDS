const { participantService } = require('../service');
const ApiError = require('../exceptions/apiError');

class ParticipantController {
    async create(req, res, next) {
        try {
            const participantData = req.body;
            
            // Validate required fields
            if (!participantData.match_id) {
                return next(ApiError.badRequest('match_id is required'));
            }
            
            if (!participantData.participant_type) {
                return next(ApiError.badRequest('participant_type is required'));
            }
            
            if (participantData.participant_type === 'team' && !participantData.team_id) {
                return next(ApiError.badRequest('team_id is required for team participant'));
            }
            
            if (participantData.participant_type === 'single' && !participantData.single_id) {
                return next(ApiError.badRequest('single_id is required for single participant'));
            }
            
            const participant = await participantService.create(participantData);
            return res.status(201).json(participant);
        } catch (e) {
            next(ApiError.badRequest('Error creating participant', e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const filters = {
                participant_type: req.query.participant_type,
                match_id: req.query.match_id,
                team_id: req.query.team_id,
                single_id: req.query.single_id
            };
            
            const participants = await participantService.getAll(filters);
            return res.json(participants);
        } catch (e) {
            next(ApiError.internal('Error getting participants', e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const participant = await participantService.getOne(id);
            return res.json(participant);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const participantData = req.body;
            
            const participant = await participantService.update(id, participantData);
            return res.json(participant);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await participantService.delete(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ParticipantController(); 