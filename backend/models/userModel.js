const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
})

// static signup method
userSchema.statics.signup = async function (email, password) {

  // check if email is taken
  const existsCheck = await this.findOne({ email }) // 'this' refers to the User model
  if (existsCheck) throw new Error('Email is already in use')

  // salt and hash password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  // create new user
  const newUser = await this.create({ // 'this' refers to the User model
    email,
    password: hash
  })

  return newUser
}

module.exports = mongoose.model('User', userSchema)