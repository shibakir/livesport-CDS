const { teamService } = require('../service');
const ApiError = require('../exceptions/apiError');

class TeamController {
    async create(req, res, next) {
        try {
            const teamData = req.body;
            const team = await teamService.create(teamData);
            return res.status(201).json(team);
        } catch (e) {
            next(ApiError.badRequest('Error creating team', e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const filters = {
                team_name: req.query.team_name,
                includeParticipant: req.query.includeParticipant === 'true'
            };
            
            const teams = await teamService.getAll(filters);
            return res.json(teams);
        } catch (e) {
            next(ApiError.internal('Error getting teams', e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const includeParticipant = req.query.includeParticipant === 'true';
            
            const team = await teamService.getOne(id, includeParticipant);
            return res.json(team);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const teamData = req.body;
            
            const team = await teamService.update(id, teamData);
            return res.json(team);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await teamService.delete(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TeamController();