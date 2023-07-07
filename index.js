const express = require("express");
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "NikeShop",
  password: "admin",
  port: 5432,
});
const PORT = 3001;
const app = express();
let allProducts;
let productImages;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // разрешаем запросы с любого домена
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // разрешаем методы GET, POST, PUT и DELETE
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // разрешаем заголовки Content-Type и Authorization
  next();
});
function getProductImages(id) {
  const queryProductImages = `SELECT image FROM product_images WHERE product_id = ${id}`;
  return new Promise((resolve, reject) => {
    pool.query(queryProductImages, (err, res) => {
      if (err) {
        reject(err);
      } else {
        const productImages = {
          images: res.rows.map((obj) => obj.image).flat(),
        };
        resolve(productImages);
      }
    });
  });
}

const query = "SELECT * FROM public.goods";
pool.query(query, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  allProducts = res.rows;
});

app.get("/catalog", (req, res) => {
  let queryURL = "SELECT * FROM public.goods";
  // const categoryId = req.query.category;
  // if (categoryId != "") {
  //   queryURL = query + ` WHERE product_category=${categoryId} `;
  // }
  pool.query(queryURL, (err, result) => {
    if (err) {
      console.log(queryURL);
      res.sendStatus(400);
    } else {
      res.send(result.rows); // отправляем данные из базы данных на клиентскую сторону
    }
  });
});
app.get("/item/:product_id", (req, res) => {
  const productId = req.params.product_id;
  const product = allProducts.find((obj) => obj.product_id == productId);
  getProductImages(productId).then((productImages) => {
    console.log(productImages);
    const result = { ...product, ...productImages };
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}...`);
});
