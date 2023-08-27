const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
  res.json({message: 'login user'})
}

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const newUser = await User.signup(email, password)

    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  signupUser,
  loginUser
} 