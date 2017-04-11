The repo contains 2 projects:
- Frontend - React app
- Backend - Node API

#### Backend

To run this on your system, you need the following:
- Node JS >= 6.2.2
- MongoDB - latest

Setup:
- Clone the repo
- Go into backend project and run `npm install`
- Copy .env.example file and create .env file
- Update .env file with your mongodb connection string and other settings
- Run `npm start` to start the backend api

NOTE: In test and development environment, the database is set to reset everytime the backend api starts (for dev usage).

And that's it! The API will be up and running (by default on port 3001 as in .env file).

#### Frontend

Setup:
- Go to frontend project and run `npm install`
- Update API endpoint as per your need in `constants/index.js`
- Run `npm start` to launch the app

The frontend will run on port 3000 by default and will request to API on port 3001.
