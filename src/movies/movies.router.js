//Require the Express router and create a controller
const router = require("express").Router();
const controller = require("./movies.controller");

//Require methodNotAllowed
const methodNotAllowed = require("../errors/methodNotAllowed");

//Create routes
router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId([0-9]+)").get(controller.read).all(methodNotAllowed);

router
  .route("/:movieId([0-9]+)/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);

router
  .route("/:movieId([0-9]+)/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);

module.exports = router;
