const router = require('express').Router();
const Category = require('../models/category');

router.post('/', async (req, res) => {
  const newCat = new Category(req.body)
  try {
    const savedCat = await newCat.save()
    res.status(200).json(savedCat)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(500)
  }
})

module.exports = router