const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();

const authRoutes = require('./routes/auth')

const mongoDb = process.env.MONGO_URI
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(express.json());

app.use('/api/auth', authRoutes)


app.listen("3000", () => {
  console.log("Backend is running")
})