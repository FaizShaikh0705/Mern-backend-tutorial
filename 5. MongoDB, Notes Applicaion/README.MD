# Notes Application Project

In this section we will build a RESTApi for a Notes Application using Express, MongoD and NodeJs

## Project Structure

- `config/`: Contains a function to create a connection with MongoDB database.
- `controllers/`: Contains controller files managing the logic for various CRUD operations.
- `models/`: Contains Models for our MongoDB database.
- `routes/`: Contains routers which navigates the request to particular controllers.
- `index.js`: The main entry point of the application.
- `package.json`: Contains metadata about the project, such as dependencies and scripts.

## Getting Started

### Running the Application

1. Create a `.env` file in your project's root directory and add a MongoDB URI variable like below
`
mongodb+srv://<userid>:<password>@mohsinogen.smovl.mongodb.net/<databaseName>?retryWrites=true&w=majority
`
2. Open the project directory in the terminal and run `npm install` command to install all the required packages.
3. Start the server by running `npm start` in the terminal.
4. The server will start, and you can interact with the API using a tool like Postman..

## Usage

- The routes and their corresponding functionalities can be tested using API testing tools like Postman.
- Perform CRUD operations on data stored in `db.json`.
