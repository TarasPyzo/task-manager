const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: { type: Number, default: 50 },
  phone: {
    type: String,
    validate: {
      validator(v) {
        return validator.isMobilePhone(v, ['uk-UA']);// /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  password: {
    type: String,
    minlength: 7,
    trim: true,
    /*validate: {
      validator(v) {
        return validator.
      },
      message: props => 'Password does not meet the requirements!'
    },*/
    required: true
  },
/*  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]*/
});

userSchema.methods.genAuthToken = async function () {
  const secretKey = 'secret';
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '1 day' }
  );
  console.log(this);
  await this.save()
  //const user = await this.findByIdAndUpdate(this._id, { $push: { tokens: token } });
  //console.log(user);

  return token;
};

userSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email });

  if(!user) throw new Error('Wrong credentials!');

  const isValidPassword = await bcrypt.compare(password, user.password);

  if(!isValidPassword) throw new Error('Wrong credentials!');

  return user;
};

userSchema.pre('save', async function() {
  try {
    console.log(this.password);
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    console.log(this.password);
  } catch (error) {
    console.log(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
