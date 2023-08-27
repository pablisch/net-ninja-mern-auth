const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {expiresIn: 2 * 60 * 60}) // 2 hours in seconds
}

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const loginUser = await User.login(email, password)

    // create token
    const token = createToken(loginUser._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const newUser = await User.signup(email, password)

    // create token
    const token = createToken(newUser._id)

    res.status(201).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  signupUser,
  loginUser
} 