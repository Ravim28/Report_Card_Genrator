const express = require('express');
const ReportCard = require('../models/ReportCard');
const Student = require('../models/Student');
const router = express.Router();
const auth = require('./auth');
// Generate report card
router.post('/:studentId', auth, async (req, res) => {
  const { grades, comments } = req.body;

  try {
    const reportCard = new ReportCard({
      studentId: req.params.studentId,
      grades,
      comments,
    });

    const savedReportCard = await reportCard.save();

    // Optionally, notify parents (via email, etc.)
    res.json(savedReportCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get report card by student ID
router.get('/:studentId', auth, async (req, res) => {
  try {
    const reportCard = await ReportCard.findOne({ studentId: req.params.studentId });
    if (!reportCard) return res.status(404).json({ message: 'Report Card not found' });
    res.json(reportCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
