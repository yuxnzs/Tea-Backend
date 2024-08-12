const express = require("express");
const bodyParser = require("body-parser");
const { TeaGarden } = require("./db");

const app = express();
app.use(bodyParser.json());

// 從資料庫查詢返回 JSON 資料，並將所有 document 按最早的 teaData 日期排序
app.get("/tea/:id", (req, res) => {
  const teaGardenID = req.params.id;
  TeaGarden.find({ teaGardenID: parseInt(teaGardenID) })
    .then((documents) => {
      // 對所有 document 按最早的 teaData 日期進行排序
      documents.sort(
        (a, b) => new Date(a.teaData[0].date) - new Date(b.teaData[0].date)
      );
      res.json(documents);
    })
    .catch((err) => res.status(500).send(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
