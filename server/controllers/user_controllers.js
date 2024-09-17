const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/config");



exports.register = async (req, res) => {
    console.log("inside register controller");

    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);

        const user = await User.create_user(name, email, password);

        res.status(201).json({ message: "User created", user });
    } catch (err) {
        console.log("Server error:", { error: err.message });

        if (err.message === "Email is already in use.") {
            res.status(400).json({ message: err.message }); // 400 Bad Request for email in use
        } else {
            res.status(500).json({ message: "Internal Server Error" }); // 500 Internal Server Error for other errors
        }
    }
};


exports.log_in = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.find_by_email(email);

    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {

        const token = jwt.sign({ id: user.id }, "abod2000");

        res.json({ token });
    }
    else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

