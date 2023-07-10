const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  "freedb_NikeShop", // Название БД
  "freedb_alexx", // Пользователь
  "RxmHZWJzuFj9%p9", // ПАРОЛЬ
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);
