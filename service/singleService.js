const { Single, Participant, Person } = require('../model');
const ApiError = require('../exceptions/apiError');
const { sequelize } = require('../model/db');

/**
 * @class SingleService
 */
class SingleService {
    /**
     * Create a new single participant without a link to a Participant
     * @param {Object} singleData - Data of a single participant
     * @returns {Promise<Object>} Created single participant
     */
    async create(singleData) {
        const transaction = await sequelize.transaction();
        
        try {
            // Check if Person exists
            const person = await Person.findByPk(singleData.person_id, { transaction });
            
            if (!person) {
                await transaction.rollback();
                throw ApiError.notFound('Person not found');
            }
            
            // Create Single record
            const single = await Single.create({
                person_id: singleData.person_id
            }, { transaction });
            
            // If you need to create a Participant
            if (singleData.createParticipant) {
                const participant = await Participant.create({
                    name: person.name || `Participant ${single.id}`,
                    participant_type: 'single'
                }, { transaction });
                
                await single.update({ participant_id: participant.id }, { transaction });
            }
            
            await transaction.commit();
            
            return await this.getOne(single.id, true);
        } catch (error) {
            await transaction.rollback();
            throw ApiError.badRequest('Error creating single', error.message);
        }
    }

    /**
     * Get all single participants with optional filters
     * @param {Object} filters - Optional filters
     * @returns {Promise<Array>} List of single participants
     */
    async getAll(filters = {}) {
        const whereClause = {};
        
        if (filters.person_id) {
            whereClause.person_id = filters.person_id;
        }
        
        const includeOptions = [];
        
        if (filters.includePerson || filters.includeAll) {
            includeOptions.push({ model: Person, as: 'person' });
        }
        
        if (filters.includeParticipant || filters.includeAll) {
            includeOptions.push({ model: Participant, as: 'participant' });
        }
        
        const singles = await Single.findAll({
            where: whereClause,
            include: includeOptions
        });
        
        return singles;
    }

    /**
     * Get a single participant by ID
     * @param {number} id - ID of single participant
     * @param {boolean} includeAll - Include all related data
     * @returns {Promise<Object>} Single participant
     */
    async getOne(id, includeAll = false) {
        const includeOptions = [];
        
        if (includeAll) {
            includeOptions.push(
                { model: Person, as: 'person' },
                { model: Participant, as: 'participant' }
            );
        }
        
        const single = await Single.findByPk(id, {
            include: includeOptions
        });
        
        if (!single) {
            throw ApiError.notFound('Single not found');
        }
        
        return single;
    }

    /**
     * Delete a single participant
     * @param {number} id - ID of single participant
     * @returns {Promise<Object>} Result of operation
     */
    async delete(id) {
        const transaction = await sequelize.transaction();
        
        try {
            const single = await Single.findByPk(id, { 
                include: [{ model: Participant, as: 'participant' }],
                transaction 
            });
            
            if (!single) {
                await transaction.rollback();
                throw ApiError.notFound('Single not found');
            }
            
            // Если есть связанный участник, удаляем его
            if (single.participant) {
                await single.participant.destroy({ transaction });
            }
            
            await single.destroy({ transaction });
            
            await transaction.commit();
            return { message: 'Single successfully deleted' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new SingleService(); 