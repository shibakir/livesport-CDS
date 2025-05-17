const { Match, Participant, Team, Single, Person } = require('../model');
const ApiError = require('../exceptions/apiError');
const { sequelize } = require('../model/db');
const participantService = require('../service/participantService');

class MatchService {
    /**
     * Create new match
     * @param {Object} matchData - Match data
     * @returns {Promise<Object>} Created match
     */
    async create(matchData) {
        try {
            const match = await Match.create({
                start_time: matchData.start_time,
                status: matchData.status || 'scheduled'
            });

            return await this.getOne(match.id);
        } catch (error) {
            console.log(error);
            throw ApiError.badRequest('Error creating match', error.message);
        }
    }

    /**
     * Get all matches with optional filters
     * @param {Object} filters - Optional filters
     * @returns {Promise<Array>} List of matches
     */
    async getAll(filters = {}) {
        const whereClause = {};

        if (filters.status) {
            whereClause.status = filters.status;
        }

        const includeOptions = [];

        if (filters.includeParticipants) {
            includeOptions.push({
                model: Participant,
                as: 'participants',
                include: [
                    { model: Team },
                    {
                        model: Single,
                        include: [{ model: Person, as: 'person' }]
                    }
                ]
            });
        }

        const matches = await Match.findAll({
            where: whereClause,
            include: includeOptions
        });

        return matches;
    }

    /**
     * Get one match by id
     * @param {number} id - ID match
     * @param {boolean} includeParticipants - Include participants
     * @returns {Promise<Object>} Match
     */
    async getOne(id, includeParticipants = true) {
        const includeOptions = [];

        if (includeParticipants) {
            includeOptions.push({
                model: Participant,
                as: 'participants',
                include: [
                    { model: Team },
                    {
                        model: Single,
                        include: [{ model: Person, as: 'person' }]
                    }
                ]
            });
        }

        const match = await Match.findByPk(id, {
            include: includeOptions
        });

        if (!match) {
            throw ApiError.notFound('Match not found');
        }

        return match;
    }

    /**
     * Update match
     * @param {number} id - ID match
     * @param {Object} matchData - New match data
     * @returns {Promise<Object>} Updated match
     */
    async update(id, matchData) {
        const match = await Match.findByPk(id);

        if (!match) {
            throw ApiError.notFound('Match not found');
        }

        await match.update({
            date: matchData.date || match.date,
            location: matchData.location || match.location,
            status: matchData.status || match.status
        });

        return await this.getOne(id);
    }

    /**
     * Delete match
     * @param {number} id - ID match
     * @returns {Promise<Object>} Result of operation
     */
    async delete(id) {
        const transaction = await sequelize.transaction();

        try {
            const match = await Match.findByPk(id, {
                include: [{ model: Participant, as: 'participants' }],
                transaction
            });

            if (!match) {
                await transaction.rollback();
                throw ApiError.notFound('Match not found');
            }

            // Delete match
            await match.destroy({ transaction });
            
            await transaction.commit();
            return { message: 'Match successfully deleted' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new MatchService(); 