require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const router = require("./routes");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // разрешаем запросы с любого домена
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // разрешаем методы GET, POST, PUT и DELETE
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // разрешаем заголовки Content-Type и Authorization
  next();
});
app.use("/api", router);

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
