const mongoose = require('mongoose');
const slugify = require('slugify');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 160
  },
  slug: {
    type: String,
    lowercase: true,
    required: false,
    unique: true,
    index: true, //Đánh index
    maxLength: 160,
    validate: {
      validator: function (value) {
        if (!value) return true;
        
        /** Nếu có điền thì validate */
        if (value.length > 0) {
          const slugRegex = /^[a-zA-Z0-9-]+$/;
          return slugRegex.test(value);
        }

        return true;
      },
      message: 'Slug must be unique and contain only letters, numbers, and hyphens'
    },
  },
  meteTitle: {
    type: String,
    required: false,
    maxLength: 255,
  },
  meteDescription: {
    type: String,
    required: false,
    maxLength: 255,
  },
  content: {
    type: String,
    required: false,
    maxLength: 500,
  },
  image: {
    type: String,
    required: false,
    maxLength: 255
  },
});
const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
