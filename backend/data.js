const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    player: String,
    score: Number
  },
  { timestamps: true }
);

// export the new Schema so we can modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);