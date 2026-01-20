const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
exports.registerUser = (req, res) => {
  const { username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if username already exists
  const usernameCheckQuery = "SELECT * FROM Users WHERE username = ? OR email = ?";
  db.query(usernameCheckQuery, [username, email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Password hashing failed" });
      }

      // Insert new user
      const query =
        "INSERT INTO Users (username,email , password) VALUES (?, ?, ?)";
      db.query(query, [username, email, hashedPassword ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Registration failed" });
          }

        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
};

// User login
exports.loginUser = (req, res) => {
  console.log("LOGIN BODY:", req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const query = "SELECT * FROM Users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Password comparison failed" });
      }
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.user_id, username: user.username, role: user.role }, 
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
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
  const { user_id, username, email } = req.body;

  if (!user_id || !username || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Check if the user exists first
  const checkUserQuery = "SELECT * FROM Users WHERE user_id = ?";
  db.query(checkUserQuery, [user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate username or email
    const conflictQuery = `
      SELECT * FROM Users
      WHERE (username = ? OR email = ?) AND user_id != ?
    `;

    db.query(conflictQuery, [username, email, user_id], (err, conflicts) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (conflicts.length > 0) {
        return res
          .status(400)
          .json({ message: "Username or email already in use" });
      }

    // Update user details
    const query = "UPDATE Users SET email = ?, username = ? WHERE user_id = ?";
    db.query(query, [email, username, user_id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Update failed" });
        }
      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "No changes made to profile" });
      }

      res.json({ message: "Profile updated successfully" });
    });
  });
});
}

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
}
