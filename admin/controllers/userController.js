const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User registration
exports.registerUser = (req, res) => {
  const { username, password, name } = req.body;

  // Check if username already exists
  const usernameCheckQuery = "SELECT * FROM Users WHERE username = ?";
  db.query(usernameCheckQuery, [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;

      // Insert new user
      const query =
        "INSERT INTO Users (username, password, name) VALUES (?, ?, ?)";
      db.query(query, [username, hashedPassword, name], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
};

// User login
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM Users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.user_id, username: user.username, role: user.role }, // Payload
        "your_secret_key", // Replace with your secret key
        { expiresIn: "1h" } // Set token expiry
      );

      // Return token instead of sensitive user data
      res.json({
        message: "Login successful",
        token,
      });
    });
  });
};

// Update user profile
exports.updateProfile = (req, res) => {
  const { user_id, name, username } = req.body;

  // Check if the user exists first
  const checkUserQuery = "SELECT * FROM Users WHERE user_id = ?";
  db.query(checkUserQuery, [user_id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    const query = "UPDATE Users SET name = ?, username = ? WHERE user_id = ?";
    db.query(query, [name, username, user_id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "No changes made to profile" });
      }

      res.json({ message: "Profile updated successfully" });
    });
  });
};

// Delete user account
exports.deleteUser = (req, res) => {
  const { user_id } = req.body;

  // Check if the user exists
  const checkUserQuery = "SELECT * FROM Users WHERE user_id = ?";
  db.query(checkUserQuery, [user_id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from the Users table
    const deleteQuery = "DELETE FROM Users WHERE user_id = ?";
    db.query(deleteQuery, [user_id], (err, result) => {
      if (err) throw err;
      res.status(200).json({ message: "User account deleted successfully" });
    });
  });
};
