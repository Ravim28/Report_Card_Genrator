const express = require('express');
const cors = require('cors');
const Student = require('../models/Student');
const auth = require('../middleware/auth'); // Ensure auth middleware is correctly implemented
const router = express.Router();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Add a new student
router.post('/Students', auth, async (req, res) => {
    const { name, rollNumber, class: studentClass } = req.body;
    try {
      const newStudent = new Student({
        name,
        rollNumber,
        class: studentClass,
        userId: req.user.id // Assuming `req.user` contains the logged-in user's info
      });
      const savedStudent = await newStudent.save();
      res.json(savedStudent);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

// Get all students
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find({ userId: req.user.id });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student information
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
router.delete('/:id', auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/students', router); // Ensure routes are properly mounted

module.exports = app;
