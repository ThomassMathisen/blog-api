const router = require('express').Router();
const Post = require('../models/post');

// Create post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username == req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body, 
          },
          { new: true }
        )
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json("You can only update your own posts")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        await post.delete()
        res.status(200).json("Post has been deleted")
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json("You can only delete your own posts")
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

// Get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get all posts
router.get('/', async (req, res) => {
  const username = req.query.user
  const categories = req.query.categories
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (categories) {
      posts = await Post.find({
        categories: {
          $in: [categories],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router