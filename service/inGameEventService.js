const { InGameEvent } = require('../model');
const ApiError = require('../exceptions/apiError');
const participantService = require('./participantService');

/**
 * @class InGameEventService
 */
class InGameEventService {
    
    async create(match_id, event_type_id, participant_id, timestamp_sec, description) {
        const inGameEvent = await InGameEvent.create({
            match_id,
            event_type_id,
            participant_id,
            timestamp_sec,
            description
        });

        // If the event type is a goal, update the participant's score
        if (parseInt(event_type_id) === 1) { // Assuming the ID for "Goal" is 1 /// should be better enum type instead of random id number. id number is referenced from seed.js
            await this.updateParticipantScore(participant_id);
        }
        
        return inGameEvent;
    }

    /**
     * Updates the score of a participant after a goal
     * @param {number} match_id - ID of the match
     * @param {number} participant_id - ID of the participant who scored a goal
     * @private
     */
    async updateParticipantScore(participant_id) {

        const participant = await participantService.getOne(participant_id);

        await participantService.update(participant.id, {
            score: participant.score+1
        });
    }

    
    async getAll() {
        const inGameEvents = await InGameEvent.findAll();
        return inGameEvents;
    }

    
    async getOne(id) {
        const inGameEvent = await InGameEvent.findByPk(id);
        
        if (!inGameEvent) {
            throw ApiError.notFound('In-game event not found');
        }
        
        return inGameEvent;
    }

    
    async update(id, match_id, event_type_id, participant_id, timestamp_sec, description) {
        const inGameEvent = await InGameEvent.findByPk(id);
        
        if (!inGameEvent) {
            throw ApiError.notFound('In-game event not found');
        }
        
        await inGameEvent.update({
            match_id,
            event_type_id,
            participant_id,
            timestamp_sec,
            description
        });
        
        return inGameEvent;
    }

    
    async delete(id) {
        const inGameEvent = await InGameEvent.findByPk(id);
        
        if (!inGameEvent) {
            throw ApiError.notFound('In-game event not found');
        }
        
        await inGameEvent.destroy();
        return { message: 'In-game event successfully deleted' };
    }
}

module.exports = new InGameEventService(); 