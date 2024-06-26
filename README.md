# Mern-backend-tutorial

# Getting Started with Node.js

## Setting Up Your Project

Install Node.js: If you haven't already, download and install Node.js from the official website: https://nodejs.org/
Create a Project Directory: Open your terminal or command prompt and create a new folder for your project using the mkdir command. For example:
mkdir my-first-nodejs-project
cd my-first-nodejs-project
Initialize a Package File: Run the following command to create a package.json file, which will manage your project's dependencies:
npm init
## Understanding the Code

const http = require("http");

const app = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    res.end("home");
  } else if (req.url === "/users") {
    res.end("user's data");
  } else if (req.url === "/teachers") {
    res.end("teacher's data");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
Explanation:

Importing the HTTP Module:

const http = require("http"); imports the built-in http module, which allows you to create web servers in Node.js.
Creating a Server:

const app = http.createServer((req, res) => { ... }); creates a new server instance and defines a callback function that will handle incoming requests.
Handling Requests:

req represents the incoming request object, containing information like the URL, headers, and body.
res represents the response object, which you use to send responses back to the client.
The code checks the req.url to determine which response to send:
If the URL is /, it sends "home".
If the URL is /users, it sends "user's data".
If the URL is /teachers, it sends "teacher's data".
Starting the Server:

app.listen(PORT, () => { ... }); starts the server and listens for incoming connections on the specified port (8000 in this case).
The callback function logs a message to the console when the server is successfully started.
## Running the Project

Save the Code: Save the code as a JavaScript file (e.g., app.js) in your project directory.
Run the Server: Open your terminal in the project directory and execute the following command:
node app.js
Test in Browser: Open your web browser and visit http://localhost:8000/ or any of the other defined URLs (/users or /teachers) to see the corresponding responses.
Congratulations! You've successfully created and run your first Node.js web server!

## Next Steps:

Install nodemon: to auto restart the server whenever you change anything.
Add start script: In package.json add below line in scripts tag
"start": "nodemon index.js"
Run the project: Type and enter npm start in the terminal to start the project.
