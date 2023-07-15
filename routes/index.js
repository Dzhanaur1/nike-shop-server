const Router = require("express");
const router = new Router();
const productRouter = require("./productRouter");
const mailerRouter = require("./mailerRouter");

router.use("/", productRouter);
router.use("/", mailerRouter);

module.exports = router;
