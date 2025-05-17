const { Participant, Team, Single, Match } = require('../model');
const ApiError = require('../exceptions/apiError');
const { sequelize } = require('../model/db');

/**
 * @class ParticipantService
 */
class ParticipantService {
    /**
     * Creates a new participant for a match
     * @param {Object} data - Participant data
     * @returns {Promise<Object>} Created participant
     */
    async create(data) {
        const transaction = await sequelize.transaction();
        
        try {
            // Check if match exists
            const match = await Match.findByPk(data.match_id, { transaction });
            if (!match) {
                await transaction.rollback();
                throw ApiError.notFound('Match not found');
            }
            
            // Validate participant type and related entity
            if (data.participant_type === 'team') {
                if (!data.team_id) {
                    await transaction.rollback();
                    throw ApiError.badRequest('team_id is required for team participant');
                }
                
                const team = await Team.findByPk(data.team_id, { transaction });
                if (!team) {
                    await transaction.rollback();
                    throw ApiError.notFound('Team not found');
                }
            } else if (data.participant_type === 'single') {
                if (!data.single_id) {
                    await transaction.rollback();
                    throw ApiError.badRequest('single_id is required for single participant');
                }
                
                const single = await Single.findByPk(data.single_id, { transaction });
                if (!single) {
                    await transaction.rollback();
                    throw ApiError.notFound('Single not found');
                }
            } else {
                await transaction.rollback();
                throw ApiError.badRequest('Invalid participant_type');
            }
            
            // Create participant
            const participant = await Participant.create({
                participant_type: data.participant_type,
                match_id: data.match_id,
                team_id: data.participant_type === 'team' ? data.team_id : null,
                single_id: data.participant_type === 'single' ? data.single_id : null,
                score: data.score || 0
            }, { transaction });
            
            await transaction.commit();
            
            return await this.getOne(participant.id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Gets all participants with optional filters
     * @param {Object} filters - Optional filters
     * @returns {Promise<Array>} List of participants
     */
    async getAll(filters = {}) {
        const whereClause = {};
        
        if (filters.participant_type) {
            whereClause.participant_type = filters.participant_type;
        }
        
        if (filters.match_id) {
            whereClause.match_id = filters.match_id;
        }
        
        if (filters.team_id) {
            whereClause.team_id = filters.team_id;
        }
        
        if (filters.single_id) {
            whereClause.single_id = filters.single_id;
        }
        
        const participants = await Participant.findAll({
            where: whereClause,
            include: [
                { model: Team },
                { model: Single },
                { model: Match }
            ]
        });
        
        return participants;
    }

    /**
     * Gets a participant by ID
     * @param {number} id - Participant ID
     * @returns {Promise<Object>} Participant
     */
    async getOne(id) {
        const participant = await Participant.findByPk(id, {
            include: [
                { model: Team },
                { model: Single },
                { model: Match }
            ]
        });
        
        if (!participant) {
            throw ApiError.notFound('Participant not found');
        }
        
        return participant;
    }

    /**
     * Updates a participant
     * @param {number} id - Participant ID
     * @param {Object} data - New data for the participant
     * @returns {Promise<Object>} Updated participant
     */
    async update(id, data) {
        const transaction = await sequelize.transaction();
        
        try {
            const participant = await Participant.findByPk(id, { transaction });
            
            if (!participant) {
                await transaction.rollback();
                throw ApiError.notFound('Participant not found');
            }
            
            // Update score if provided
            if (data.score !== undefined) {
                await participant.update({ score: data.score }, { transaction });
            }
            
            await transaction.commit();
            return await this.getOne(id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Deletes a participant
     * @param {number} id - Participant ID
     * @returns {Promise<Object>} Result message
     */
    async delete(id) {
        const transaction = await sequelize.transaction();
        
        try {
            const participant = await Participant.findByPk(id, { transaction });
            
            if (!participant) {
                await transaction.rollback();
                throw ApiError.notFound('Participant not found');
            }

            await participant.destroy({ transaction });
            
            await transaction.commit();
            return { message: 'Participant successfully deleted' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new ParticipantService(); 