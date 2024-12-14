const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const bcrypt = require('bcrypt');

// Simulate a database (In real-world, replace with MongoDB or any DB)
const users = [
  { username: 'user1', password: '$2b$10$abcdefg1234567hashedPasswordExample' }, // bcrypt hashed password
];

// Helper to send JSON response
function sendJsonResponse(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}

// Function to handle login
async function handleLogin(req, res) {
  let body = '';

  // Read the request body
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const { username, password } = parse(body);

    // Find the user
    const user = users.find((u) => u.username === username);

    if (!user) {
      return sendJsonResponse(res, 400, 'Username not found.');
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendJsonResponse(res, 400, 'Incorrect password.');
    }

    // Successful login
    sendJsonResponse(res, 200, 'Login successful!');
  });
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/login') {
    handleLogin(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
