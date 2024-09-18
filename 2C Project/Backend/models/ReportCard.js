const mongoose = require('mongoose');

const reportCardSchema = new mongoose.Schema({
  studentName: String,
  class: String,
  subjects: [
    {
      subjectName: String,
      grade: String,
      comments: String,
    },
  ],
});

const ReportCardd = mongoose.model('ReportCard', reportCardSchema);

module.exports = ReportCardd;
