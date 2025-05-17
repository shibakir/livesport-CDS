const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LiveSport API',
      version: '1.0.0',
      description: 'API documentation for LiveSport application',
      contact: {
        name: 'API Support',
        email: 'support@livesport.example'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Team: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        Match: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            start_time: { type: 'string', format: 'date-time' },
            status: { 
              type: 'string',
              enum: ['scheduled', 'live', 'completed', 'canceled']
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        Participant: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            match_id: { type: 'integer' },
            team_id: { type: 'integer', nullable: true },
            single_id: { type: 'integer', nullable: true },
            participant_type: { 
              type: 'string',
              enum: ['team', 'single'] 
            },
            score: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        InGameEvent: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            event_type_id: { type: 'integer' },
            match_id: { type: 'integer' },
            participant_id: { type: 'integer' },
            timestamp_sec: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        InGameEventType: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        Person: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        Single: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            person_id: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        TeamMember: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            team_id: { type: 'integer' },
            person_id: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./route/*.js'], // Path to the API docs (all route files)
};

const specs = swaggerJsdoc(options);

module.exports = specs; 