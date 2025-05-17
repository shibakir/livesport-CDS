const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

async function getAllTeams() {
    try {
        const response = await axios.get(`${API_URL}/teams`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error: ', error.message);
        return [];
    }
}

// Function to create a match between two teams
async function createMatch(team1Id, team2Id) {
    try {
        // Create a match
        const startTime = new Date();
        
        const matchResponse = await axios.post(`${API_URL}/matches`, {
            start_time: startTime,
            status: 'scheduled'
        });
        
        const matchId = matchResponse.data.id;
        
        // Add participants
        await axios.post(`${API_URL}/participants`, {
            match_id: matchId,
            team_id: team1Id,
            participant_type: 'team',
            score: 0
        });
        await axios.post(`${API_URL}/participants`, {
            match_id: matchId,
            team_id: team2Id,
            participant_type: 'team',
            score: 0
        });
        
        console.log(`Match ID:${matchId} created between teams ID:${team1Id} and ID:${team2Id}`);
        return matchId;
    } catch (error) {
        console.error(`Error creating match between teams ${team1Id} and ${team2Id}:`, error.message);
        return null;
    }
}

// Function to get participants for a match
async function getMatchParticipants(matchId) {
    try {
        // Get match with included participants
        const response = await axios.get(`${API_URL}/matches/${matchId}`);
        return response.data.participants || [];
    } catch (error) {
        console.error(`Error getting participants for match ${matchId}:`, error.message);
        return [];
    }
}

async function createInGameEvent(matchId, participantId, eventType, minute) {
    try {
        await axios.post(`${API_URL}/in-game-events`, {
            event_type_id: eventType,
            match_id: matchId,
            participant_id: participantId,
            timestamp_sec: minute
        });
    } catch (error) {
        console.error(`Error creating in-game event for match ${matchId}:`, error.message);
    }
}

// Function to update match status
async function updateMatchStatus(matchId, status) {
    try {
        await axios.put(`${API_URL}/matches/${matchId}`, {
            status: status
        });
    } catch (error) {
        console.error(`Error updating status for match ${matchId}:`, error.message);
    }
}

// Function to simulate a single match
async function simulateMatch(matchId) {
    try {
        console.log(`Simulating match ID:${matchId}`);
        
        // Get participants
        const participants = await getMatchParticipants(matchId);
        
        if (participants.length !== 2) {
            console.error(`Match ${matchId} doesn't have exactly 2 participants`);
            return;
        }
        
        // Generate random match duration between 60 and 90 minutes
        const matchDuration = Math.floor(Math.random() * 31) + 60;
        console.log(`Match duration: ${matchDuration} minutes`);
        
        // Possible events
        const events = [
            { type: '1', name: 'Goal', probability: 0.05},
            { type: '3', name: 'Yellow Card', probability: 0.05},
            { type: '4', name: 'Red Card', probability: 0.05},
        ];

        await updateMatchStatus(matchId, 'in_progress');
        
        // Simulate match minute by minute
        for (let minute = 1; minute <= matchDuration; minute++) {
            // Check for events
            for (const event of events) {
                if (Math.random() < event.probability) {

                    // Randomly select a participant to perform an action
                    let participantActionOccured = Math.random() < 0.5;
                    let participantId = participantActionOccured ? participants[0].id : participants[1].id;

                    // Create an in-game event
                    console.log(`Minute ${minute}: ${event.name} occurred for team ${participantId}`);
                    await createInGameEvent(matchId, participantId, event.type, minute);
                }
            }
        }

        // Update match status to completed
        await updateMatchStatus(matchId, 'completed');
        
        // Get updated participants with final scores
        const updatedParticipants = await getMatchParticipants(matchId);
        const team1Score = updatedParticipants[0].score || 0;
        const team2Score = updatedParticipants[1].score || 0;
        
        console.log(`Match ${matchId} completed. Final score: ${team1Score}-${team2Score}`);
    } catch (error) {
        console.error(`Error simulating match ${matchId}:`, error.message);
    }
}

async function simulateMatches() {
    try {
        const teams = await getAllTeams();

        console.log(teams);

        if (teams.length < 2) {
            console.error('Not enough teams to create matches (minimum 2)');
            return;
        }
        
        console.log(`Found ${teams.length} teams. Creating matches for each pair...`);
        
        const createdMatches = [];
        
        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                const team1 = teams[i];
                const team2 = teams[j];
                
                const matchId = await createMatch(team1.id, team2.id);
                if (matchId) {
                    createdMatches.push({
                        matchId,
                        team1: team1.name,
                        team2: team2.name
                    });
                }
            }
        }
        
        console.log(`Successfully created ${createdMatches.length} matches`);
        console.log('createdMatches: ', createdMatches);

        // Simulate each match one by one
        console.log('Starting match simulations...');
        for (const match of createdMatches) {
            await simulateMatch(match.matchId);
        }

        return createdMatches;
    } catch (error) {
        console.error('Error simulating matches:', error.message);
    }
}

// run simulation
simulateMatches()
  .then(() => console.log('Simulation completed'))
  .catch(err => console.error('Error:', err));

