const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const tracksController= require('./controllers/tracks');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors());

// Routes go here
app.use("/tracks", tracksController);
// app.use("/tracks", trackRouter); need or delete?

app.listen(3000, () => {
  console.log("The express app is ready!");
});
