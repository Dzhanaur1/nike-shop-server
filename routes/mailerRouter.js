const Router = require("express");
const sendMail = require("../controllers/mailControllers");
const router = new Router();

router.get("/feedback", sendMail);

module.exports = router;
