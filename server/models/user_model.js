const pool = require("../config/config");
const bcrypt = require("bcryptjs");

class User {
    static async create_user(username, email, password) {
        try {

            const existingUser = await User.find_by_email(email);

            if (existingUser) {
                throw new Error("Email is already in use");
            }

            const hashed_pass = await bcrypt.hash(password, 10);
            const result = await pool.query(
                "INSERT INTO users (user_name, password, email) VALUES ($1, $2, $3) RETURNING *",
                [username, hashed_pass, email]
            );
            console.log("User added successfully");
            return result.rows[0];
        } catch (err) {
            console.error("Error adding user:", err.message);
        }
    }

    static async find_by_email(email) {
        try {
            const result = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );
            return result.rows[0];
        } catch (err) {
            console.error("Error finding user by email:", err.message);
        }
    }
}

module.exports = User;
