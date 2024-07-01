const express = require("express");
const bodyParser = require("body-parser");
const { TeaGarden } = require("./db");

const app = express();
app.use(bodyParser.json());

// 從資料庫查詢並返回 JSON 資料
app.get("/tea/:id", (req, res) => {
  const teaGardenID = req.params.id;
  TeaGarden.find({ teaGardenID: teaGardenID })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).send(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
