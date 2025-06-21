const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Digital Event',
      'AR Experience',
      'Contest',
      'Community Event',
      'Social Media Campaign',
      'Mobile Experience',
      'Email Campaign',
      'Venue Enhancement',
      'Loyalty Program',
      'Content Series'
    ]
  },
  audience_size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    default: 'Medium'
  },
  budget_range: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  },
  implementation_time: {
    type: String,
    required: true,
    enum: ['Quick', 'Medium', 'Extended']
  },
  target_demographics: {
    type: [String],
    required: true,
    validate: {
      validator: function(array) {
        return array.length > 0;
      },
      message: 'At least one target demographic is required'
    }
  },
  success_metrics: {
    type: [String],
    required: true,
    validate: {
      validator: function(array) {
        return array.length > 0;
      },
      message: 'At least one success metric is required'
    }
  },
  example_cases: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the updated_at field
ideaSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;