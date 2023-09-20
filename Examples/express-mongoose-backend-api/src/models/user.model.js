const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//Tạo Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'shipper', 'admin', 'root'],
      default: 'user',
    },
    permissions: {
      type: [
        {
          module: String,
          action: String,
        },
      ],
      default: [],
    },
    isEmailVerified: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  { timestamps: true }
);


// Virtual for this genre instance URL.
userSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});


userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    user.salt = salt;
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Tạo Model User
const User = new mongoose.model('User', userSchema);
module.exports = User;
