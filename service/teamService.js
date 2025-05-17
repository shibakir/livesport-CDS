const { Team, Participant } = require('../model');
const ApiError = require('../exceptions/apiError');
const { sequelize } = require('../model/db');

class TeamService {
    /**
     * Create a new team
     * @param {Object} teamData - Data of a team
     * @returns {Promise<Object>} Created team
     */
    async create(teamData) {
        try {
            const team = await Team.create({
                name: teamData.name
            });
            
            return team;
        } catch (error) {
            throw ApiError.badRequest('Error creating team', error.message);
        }
    }

    /**
     * Get all teams
     * @returns {Promise<Array>} List of teams
     */
    async getAll() {
        const teams = await Team.findAll();
        return teams;
    }

    /**
     * Get a team by ID
     * @param {number} id - ID of a team
     * @returns {Promise<Object>} Team
     */
    async getOne(id) {
        const team = await Team.findByPk(id);
        
        if (!team) {
            throw ApiError.notFound('Team not found');
        }
        
        return team;
    }

    /**
     * Update a team
     * @param {number} id - ID of a team
     * @param {Object} teamData - New data for a team
     * @returns {Promise<Object>} Updated team
     */
    async update(id, teamData) {
        const team = await Team.findByPk(id);
        
        if (!team) {
            throw ApiError.notFound('Team not found');
        }
        
        await team.update({
            name: teamData.name || team.name
        });
        
        return await this.getOne(id);
    }

    /**
     * Link a team to a participant
     * @param {number} teamId - ID of a team
     * @param {number} participantId - ID of a participant
     * @returns {Promise<Object>} Updated team
     */
    async linkToParticipant(teamId, participantId) {
        const transaction = await sequelize.transaction();
        
        try {
            const team = await Team.findByPk(teamId, { transaction });
            
            if (!team) {
                await transaction.rollback();
                throw ApiError.notFound('Team not found');
            }
            
            const participant = await Participant.findByPk(participantId, { transaction });
            
            if (!participant) {
                await transaction.rollback();
                throw ApiError.notFound('Participant not found');
            }
            
            if (participant.participant_type !== 'team') {
                await transaction.rollback();
                throw ApiError.badRequest('Participant type must be team');
            }
            
            await team.update({ participant_id: participantId }, { transaction });
            
            await transaction.commit();
            return await this.getOne(teamId, true);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Delete a team
     * @param {number} id - ID of a team
     * @returns {Promise<Object>} Result of the operation
     */
    async delete(id) {
        const transaction = await sequelize.transaction();
        
        try {
            const team = await Team.findByPk(id, {
                include: [{ model: Participant, as: 'participant' }],
                transaction
            });
            
            if (!team) {
                await transaction.rollback();
                throw ApiError.notFound('Team not found');
            }
            
            // If there is a linked participant, delete it
            if (team.participant) {
                await team.participant.destroy({ transaction });
            }
            
            await team.destroy({ transaction });
            
            await transaction.commit();
            return { message: 'Team successfully deleted' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new TeamService(); 