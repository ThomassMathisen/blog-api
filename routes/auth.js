const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register user
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })  
  } catch (err) {
    res.status(500).json(err)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const user = User.findOne({
      username: req.body.username})
      !user && res.status(400).json('Wrong username or password')

      const validated = await bcrypt.compare(req.body.password, user.password)
      !validated && res.status(400).json('Wrong username or password')
      
      const { password, ...others } = user._doc
      res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router