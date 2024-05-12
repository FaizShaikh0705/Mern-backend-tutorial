const fs = require("fs");

// Function to read JSON data from file
function read() {
  try {
    const data = fs.readFileSync("./db.json", "utf8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (err) {
    throw new Error("Error reading file:", err);
  }
}

// Function to write JSON data into a file
function write(data) {
  try {
    const jsonString = JSON.stringify(data);
    fs.writeFileSync("./db.json", jsonString, 'utf8');
    return;
  } catch (err) {
    throw new Error("Error reading file:", err);
  }
}

module.exports = {
    read,
    write
}
