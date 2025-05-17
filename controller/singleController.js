const { singleService } = require('../service');
const ApiError = require('../exceptions/apiError');

class SingleController {
    async create(req, res, next) {
        try {
            const singleData = req.body;
            const single = await singleService.create(singleData);
            return res.status(201).json(single);
        } catch (e) {
            next(ApiError.badRequest('Error creating single', e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const filters = {
                first_name: req.query.first_name,
                last_name: req.query.last_name,
                includeParticipant: req.query.includeParticipant === 'true'
            };
            
            const singles = await singleService.getAll(filters);
            return res.json(singles);
        } catch (e) {
            next(ApiError.internal('Error getting singles', e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const includeParticipant = req.query.includeParticipant === 'true';
            
            const single = await singleService.getOne(id, includeParticipant);
            return res.json(single);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const singleData = req.body;
            
            const single = await singleService.update(id, singleData);
            return res.json(single);
        } catch (e) {
            next(e);
        }
    }

    async linkToParticipant(req, res, next) {
        try {
            const { id } = req.params;
            const { participant_id } = req.body;
            
            if (!participant_id) {
                return next(ApiError.badRequest('participant_id is required'));
            }
            
            const single = await singleService.linkToParticipant(id, participant_id);
            return res.json(single);
        } catch (e) {
            next(e);
        }
    }

    async unlinkFromParticipant(req, res, next) {
        try {
            const { id } = req.params;
            
            const single = await singleService.unlinkFromParticipant(id);
            return res.json(single);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await singleService.delete(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SingleController(); 