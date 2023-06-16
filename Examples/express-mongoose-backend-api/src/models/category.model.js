const mongoose = require('mongoose');
const buildSlug = require('../helpers/buildSlug')


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxLength: 160
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    maxLength: 160,
    validate: {
      validator: function (value) {
        if (!value) return true;

        /** Nếu có điền thì validate */
        if (value.length > 0) {
          const slugRegex = /^([a-z0-9\-]+)$/;
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


categorySchema.pre("save", async function (next) {
  if(this.slug == ""){
      this.slug = buildSlug(this.name);
  }
  next();
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
