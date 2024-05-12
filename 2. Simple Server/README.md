# Node.js HTTP Simple Server

## Overview

The script uses Node.js's built-in `http` module to create a server. This server listens on port 5000 and can handle three different types of requests based on the URL path: '/', '/test', and any other (unknown) paths.

### Code Breakdown

Here's a breakdown of the key parts of the script:

```javascript
const http = require("http");
```
- This line imports Node.js's built-in `http` module, which allows us to create a web server.

```javascript
const server = http.createServer((req, res) => { ... });
```
- Here, we create an HTTP server. The `createServer` method takes a callback function that is called with two objects, `req` (request) and `res` (response), every time a request is made to the server.

#### Handling Different URLs

1. **Root URL ('/')**:
   - If the request URL is '/', the server responds with an HTTP status code of 200 (OK) and sends a simple HTML message.
   ```javascript
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('<h1 style="color:blue;">Hello World</h1>');
   ```

2. **'/test' URL**:
   - For requests to '/test', the server responds with a 500 status code, indicating an internal server error, and sends a JSON object.
   ```javascript
   res.writeHead(500, {'Content-Type': 'application/json'});
   res.end(JSON.stringify({ ... }));
   ```

3. **Unknown URL**:
   - If any other URL is requested, the server responds with a 404 status code (Not Found) and a JSON object.
   ```javascript
   res.writeHead(404, {'Content-Type': 'application/json'});
   res.end(JSON.stringify({ ... }));
   ```

### Starting the Server

```javascript
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```
- Finally, the server is set to listen on port 5000. When it starts, it logs a message to the console.

## Running the Script

To run this script:

1. Ensure Node.js is installed on your computer.
2. Save the script in a file, e.g., `server.js`.
3. Open a terminal and navigate to the directory containing the script.
4. Run the script using Node.js:
   ```bash
   npm start
   ```
5. Open a web browser and visit `http://localhost:5000`. You should see the "Hello World" message.
