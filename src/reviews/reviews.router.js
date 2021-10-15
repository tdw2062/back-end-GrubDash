//Require the Express router and create a controller
const router = require("express").Router();
const controller = require("./reviews.controller");

//Require methodNotAllwed
const methodNotAllowed = require("../errors/methodNotAllowed");

//Create routes
router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/:reviewId([0-9]+)")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
