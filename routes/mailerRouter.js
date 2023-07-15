const Router = require("express");
const sendMail = require("../controllers/mailControllers");
const router = new Router();

router.post("/feedback", sendMail);

module.exports = router;
