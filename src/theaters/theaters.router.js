//Require the Express router and create a controller
const router = require("express").Router();
const controller = require("./theaters.controller");

//Require methodNotAllowed
const methodNotAllowed = require("../errors/methodNotAllowed");

//Create routes
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
