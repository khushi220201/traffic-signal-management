# Traffic Signal Management System - Backend

This is the backend of the Traffic Signal Management System, built using Node.js, TypeScript, Prisma, and Express. The backend serves the API that handles traffic signal configurations and other related data.

## Features

- API endpoints to manage traffic signal configurations.
- Integration with a PostgreSQL database using Prisma ORM.
- Real-time handling of traffic signal management data.

## Tech Stack

- **Node.js** - Server-side JavaScript runtime.
- **TypeScript** - Superset of JavaScript to provide type safety.
- **Prisma ORM** - Database toolkit for managing the PostgreSQL database.
- **Express.js** - Web framework to build RESTful APIs.
- **Nodemon** - Tool for automatic server restarts during development.

1. Clone the repository

git clone https://github.com/khushi220201/traffic-signal-management.git
cd backend


2. Install dependencies
Make sure you have Node.js installed. Then, run the following command to install the necessary packages:
npm install

3. Setup environment variables
Create a `.env` file in the root of the project to store environment-specific variables. Example:

DATABASE_URL="YOUR_POSTGRESQL_URL"

PORT = "8000"

REACT_APP_BASE_URL = "http://localhost:3000"

4. Run migrations
Use Prisma to migrate the database schema:

npx prisma migrate dev


5. Start the backend server

npm start

The server should now be running on http://localhost:8000

## API Endpoints

All endpoints are prefixed with `/traffic-signal-configs`

- `POST /traffic-signal-configs`
  Save a new traffic signal configuration (with validation).

- `GET /traffic-signal-configs/type/:intersectionType`
  Fetch configurations by intersection type
  Valid types: "THREE_WAY", "FOUR_WAY_TYPE1", "FOUR_WAY_TYPE2", "FIVE_WAY"

## Folder Structure

controllers/ – Business logic for handling requests.
The controller interacts with the service layer to process requests and responses.

services/ – Contains business logic and interacts with repositories for database queries.

repositories/ – Handles database operations using Prisma. The repository layer abstracts database logic for easy reuse.

routes/ – Route definitions. The routes map HTTP requests to controller actions.

middleware/ – Custom middleware for request validation, authentication, and error handling.

helpers/ – Utility functions such as validation helpers and reusable logic.

prisma/ – Database schema and migration files. Contains Prisma schema and related migration scripts.

app/ – Main app entry point that sets up Express, routes, and middleware.
