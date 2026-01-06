import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  foundedOn: {
    type: Date,
    required: [true, 'Founded date is required']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  logo: {
    type: String,
    default: 'https://via.placeholder.com/150?text=Company+Logo'
  },
  description: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

companySchema.index({ name: 'text', location: 'text', city: 'text' });

const Company = mongoose.model('Company', companySchema);

export default Company;
