const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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

  // check if email is valid
  if (!email || !password) throw new Error('Email and password are required')
  if (!validator.isEmail(email)) throw new Error('Email is not valid')
  if (!validator.isStrongPassword(password)) throw new Error('Passwords must be a minimum of eight characters and contain at least one lowercase & uppercase letter, digit and symbol')

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

// static login method
userSchema.statics.login = async function (email, password) {

  // check if email and password are provided
  if (!email || !password) throw new Error('Email and password are required')

  // check if email exists
  const user = await this.findOne({ email }) // 'this' refers to the User model
  if (!user) throw new Error('Email not found')

  // check if password is correct
  const passwordsMatch = await bcrypt.compare(password, user.password)
  if (!passwordsMatch) throw new Error('Password is incorrect')

  return user
}


module.exports = mongoose.model('User', userSchema)