const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  rating : { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
