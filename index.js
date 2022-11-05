const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();

const mongoDb = process.env.MONGO_URI
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


app.use('/', (req, res) => {
  console.log('This is main url')
})


app.listen("3000", () => {
  console.log("Backend is running")
})