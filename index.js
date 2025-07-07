const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const contactRouter = require('./routes/route');

dotenv.config();
const app =express();
app.use(express.json());
app.use(cors());

app.use('/api',contactRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.log("Something bad happened:"));
// Server setup
app.listen(5000, () => {
  console.log("Server is up and running on port 5000");
});