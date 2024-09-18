// routes/superadmin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to get all pending requests (Teachers/Students)
router.get('/pending-requests', async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' });
    res.json(pendingUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to approve a user's request
router.put('/approve/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.status = 'accepted';
    await user.save();

    res.json({ msg: 'User approved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to reject a user's request
router.put('/reject/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.status = 'rejected';
    await user.save();

    res.json({ msg: 'User rejected successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to get all approved users (Teachers/Students)
router.get('/approved-users', async (req, res) => {
  try {
    const approvedUsers = await User.find({ status: 'accepted' });
    res.json(approvedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to get all rejected users (Teachers/Students)
router.get('/rejected-users', async (req, res) => {
  try {
    const rejectedUsers = await User.find({ status: 'rejected' });
    res.json(rejectedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
