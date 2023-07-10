require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const router = require("./routes");

// const connection = mysql.createConnection({
//   host: "sql.freedb.tech",
//   user: "freedb_alexx",
//   database: "freedb_NikeShop",
//   password: "RxmHZWJzuFj9%p9",
// });

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api", router);
let allProducts;
let productImages;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // разрешаем запросы с любого домена
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // разрешаем методы GET, POST, PUT и DELETE
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // разрешаем заголовки Content-Type и Authorization
  next();
});
// const getProductImages = (id) => {
//   const queryProductImages = `SELECT photo_path FROM Photos  WHERE product_id = ${id}`;
//   connection.query(queryProductImages, (err, res) => {
//     if (err) {
//       return err;
//     } else {
//       const productImages = {
//         images: res.map((obj) => obj.photo_path).flat(),
//       };
//       return productImages;
//     }
//   });
// };
// function getProductImages(id) {
//   const queryProductImages = `SELECT photo_path FROM Photos  WHERE product_id = ${id}`;
//   return new Promise((resolve, reject) => {
//     connection.query(queryProductImages, (err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         const productImages = {
//           images: res.map((obj) => obj.photo_path).flat(),
//         };
//         resolve(productImages);
//       }
//     });
//   });
// }
// function getProductSizes(id) {
//   const queryProductSizes = `SELECT size FROM Sizes  WHERE product_id = ${id}`;
//   return new Promise((resolve, reject) => {
//     connection.query(queryProductSizes, (err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         const productSizes = {
//           sizes: res.map((obj) => obj.photo_path).flat(),
//         };
//         resolve(productSizes);
//       }
//     });
//   });
// }

// const query = "SELECT * FROM Products";
// connection.query(query, (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   allProducts = res;
// });

// app.get("/catalog", (req, res) => {
//   let queryURL = "SELECT * FROM Products";
//   // const categoryId = req.query.category;
//   // if (categoryId != "") {
//   //   queryURL = query + ` WHERE product_category=${categoryId} `;
//   // }
//   connection.query(queryURL, (err, result) => {
//     if (err) {
//       console.log(queryURL);
//       res.sendStatus(400);
//     } else {
//       // res.send("Ok");
//       console.log(result);
//       res.send(result); // отправляем данные из базы данных на клиентскую сторону
//     }
//   });
// });
// app.get("/item/:product_id", (req, res) => {
//   const productId = req.params.product_id;
//   const product = allProducts.find((obj) => obj.id == productId);
//   let images;
//   console.log(getProductImages(productId));
//   // getProductImages(productId).then((productImages) => {
//   //   images = { ...productImages };
//   // });

//   const result = { ...product, ...images };
//   console.log(result);
//   res.json(result);
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
