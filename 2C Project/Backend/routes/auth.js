const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error in registering user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.status !== 'Accepted') {
      return res.status(403).json({ message: `Your account is ${user.status}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error in login' });
  }
});

// Get all pending requests (for Super Admin)
router.get('/pending-requests', async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'Pending' });
    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending requests' });
  }
});

// Accept/Reject User
router.post('/update-status', async (req, res) => {
  const { userId, status } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { status });
    res.json({ message: 'User status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status' });
  }
});
// auth.js

// Check if user is authenticated


module.exports = router;
