const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')

dotenv.config();

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const categoryRoutes = require('./routes/categories')

const mongoDb = process.env.MONGO_URI
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200.).json("File has been uploaded")
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoryRoutes)


app.listen("5000", () => {
  console.log("Backend is running")
})