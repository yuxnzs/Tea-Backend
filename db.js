const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {});

// mongoose.connection
let dbConnection = mongoose.connection;

const teaDataSchema = new mongoose.Schema({
  area: String,
  originalImage: String,
  analyzedImage: String,
  date: String,
  weather: String,
  growth: String,
  plantingRate: String,
});

const teaGardenSchema = new mongoose.Schema({
  teaGardenID: Number,
  teaGardenName: String,
  teaGardenLocation: String,
  aiPlantingImages: {
    type: {
      original: String,
      marked: String,
    },
    default: null,
  },
  teaData: [teaDataSchema],
});

// 確保每次重新執行時不會重複建立資料庫
const TeaGarden = mongoose.connection.model("TeaGarden", teaGardenSchema);

dbConnection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

dbConnection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = { TeaGarden, dbConnection };
