const express = require("express");
const router = express.Router();
const user = require("./models/user");

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await user.findOne({ username });

    if (!existingUser || existingUser.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error during login" });
  }
});

// Register (add) new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new user({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

module.exports = router;
