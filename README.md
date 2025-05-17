# LiveSport CDS Project


## Project Description
This project implements a trial implementation of a task, including an API for interaction with a database compiled according to the task, as well as a seeder for creating basic data and code simulating matches between the created teams. The project is built on **Node.js** and uses **MySQL** database.

## Návrh databáze

Databáze je mírně rozšířenou verzí původní úlohy a je navržena tak, aby byla méně náchylná k radikálním změnám a snadno rozšiřitelná. Zápasy nemají žádná omezení počtu účastníků, účast v zápasech také není omezena pouze na týmy, ale povoleny jsou i zápasy mezi jednotlivými sportovci.

Entita Participation implementuje propojení mezi určitým hráčem a týmem a zápasem a má omezení: přítomnost pouze jednoho specifického ID aktéra v souladu s typem Participation.

Architektura aplikace je rozšířený **MVC**, kde je veškerá business logika implementována v Services.

## File Structure
```
livesport/
│
├── model/                 # Database models
├── seeder/                # Database seeding scripts
│   ├── seed.js            # Test data seeding
│   └── match-simulator.js # Match and event simulation
├── route/                 # API routing
├── controller/            # Request handlers
├── service/               # Business logic
├── middleware/            # Middleware
│   └── errorMiddleware.js # Error handling
├── exceptions/            # Custom exceptions
├── app.js                 # Application entry point
└── package.json           # Dependencies and scripts
```

## Architecture
The project uses a multi-layered architecture:
1. **Models** - represent data structure in the database
2. **Routes** - define API endpoints
3. **Controllers** - handle requests
4. **Services** - contain business logic
5. **Middleware** - for request processing

## Setup Guide

### Project Setup
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application
For run:
```
npm run dev
```

### Database Seeding
To initialize the database and populate it with test data:
```
npm run seed
```

This script will create:
- Game event types (goal, penalty, yellow card, red card)
- List of people
- 3 teams (Sparta, Spartak, Dukla)
- Distribute players among teams (11 people in each)

### Running Match Simulation
After seeding the database, you can run match simulations:
```
npm run simulate
```

The simulation will:
1. Create matches between all team pairs
2. Simulate each match with duration from 60 to 90 minutes
3. Generate random events (goals, yellow and red cards)
4. Update match scores and statuses

## API
The application provides a RESTful API for managing:
- Teams (`/api/teams`)
- Matches (`/api/matches`)
- Match participants (`/api/participants`)
- In-game events (`/api/in-game-events`)
- Single players (`/api/singles`)
