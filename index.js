require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const router = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api", router);
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // разрешаем запросы с любого домена
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // разрешаем методы GET, POST, PUT и DELETE
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // разрешаем заголовки Content-Type и Authorization
//   next();
// });
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
