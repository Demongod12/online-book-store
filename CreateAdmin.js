const bcrypt = require("bcrypt");
const db = require("./admin/config/db");

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const sql = `
    INSERT INTO Users (username, password, email, role)
    VALUES (?, ?, ?, 'admin')
  `;

  db.query(
    sql,
    ["admin", hashedPassword, "admin21@gmail.com"],
    (err, result) => {
      if (err) {
        console.error("❌ Error creating admin:", err.message);
      } else {
        console.log("✅ Admin user created successfully");
      }
      process.exit();
    }
  );
}

createAdmin();
