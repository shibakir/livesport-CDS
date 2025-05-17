const { matchService } = require('../service');
const ApiError = require('../exceptions/apiError');

class MatchController {
    async create(req, res, next) {
        try {
            const matchData = req.body;
            const match = await matchService.create(matchData);
            return res.status(201).json(match);
        } catch (e) {
            next(ApiError.badRequest('Error creating match', e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const filters = {
                status: req.query.status,
                includeParticipants: req.query.includeParticipants === 'true'
            };
            
            const matches = await matchService.getAll(filters);
            return res.json(matches);
        } catch (e) {
            next(ApiError.internal('Error getting matches', e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const includeParticipants = req.query.includeParticipants !== 'false';
            
            const match = await matchService.getOne(id, includeParticipants);
            return res.json(match);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const matchData = req.body;
            
            const match = await matchService.update(id, matchData);
            return res.json(match);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await matchService.delete(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MatchController(); 