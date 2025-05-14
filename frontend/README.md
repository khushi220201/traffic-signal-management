# Traffic Signal Management System - Frontend

This is the frontend of the Traffic Signal Management System, built using React, TypeScript, and Ant Design. The frontend communicates with the backend API to manage and display traffic signal configurations for different intersections.

## Features
- Displays traffic signal configurations based on different intersection types.
- Allows users to view traffic signal configurations from the backend.
- User-friendly interface with Ant Design components for consistent UI elements.
- Dropdown for selecting intersection types and visualizing related traffic signal configurations.

## Tech Stack
- **React.js** - JavaScript library for building user interfaces.
- **TypeScript** - Adds static typing to JavaScript, providing better code quality.
- **Ant Design** - A design system and React UI components library.
- **Axios** - HTTP client for making requests to the backend API.
- **React Router** - Routing library for navigation between different views.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/khushi220201/traffic-signal-management.git
cd frontend
```
### 2. Install dependencies
npm install

### 3. Setup environment variables
Create a .env file in the root of the project to store environment-specific variables (e.g., backend API URL). Example:
REACT_APP_API_URL="http://localhost:8000"

### 4. Start the development server
Run the following command to start the frontend development server:
npm start

### 5. The app will be available at:
http://localhost:3000

### 6. API Endpoints
The frontend communicates with the backend API to fetch traffic signal configurations. API endpoints used:

POST /traffic-signal-configs
Create or update configurations for a specific intersection type.

GET /traffic-signal-configs/type/:intersectionType
Fetch configurations for a specific intersection type.
Valid types: "THREE_WAY", "FOUR_WAY_TYPE1", "FOUR_WAY_TYPE2", "FIVE_WAY"

### 7.  How to Use the App

To use the app effectively:

First, navigate to the configuration tabs and set up the following intersection types in order:

3 Way (THREE_WAY)
4 Way Type 1 (FOUR_WAY_TYPE1)
4 Way Type 2 (FOUR_WAY_TYPE2)
5 Way (FIVE_WAY)

Then, go to the Signal tab (Visualize Traffic Signals).

Select a specific intersection type from the dropdown.

Click on the “Start Signal” button to begin the signal timing sequence.

⚠️ If a configuration has not been set up, the app will use a default signal time of 30 seconds for each light.