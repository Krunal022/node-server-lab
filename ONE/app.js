// This is a simple Node.js application that uses the 'cat-me' package to print a random cat ASCII art to the console.
// Make sure to run `npm install cat-me` before executing this script.
// Import the 'cat-me' package
const catMe = require('cat-me');

// Call the function from 'cat-me' and log the result to the console
console.log(catMe());

// This is a simple HTTP server using the 'http' module in Node.js.
// Import the 'http' module
// Note: This is a built-in module, so no need to install it via npm
const app = require('http');

// Create a server using the 'http' module
// The server will respond to different routes with different messages
const server = app.createServer((req, res) => {
    if (req.url === '/') {
        res.end("Home page")
    }
    if (req.url === '/about') {
        res.end("About page")
    }
    if (req.url === '/profile') {
        res.end("Profile page")
    }

})

// Start the server on port 3000
server.listen(3000, () => {
    console.log("server is running on port 3000")
})