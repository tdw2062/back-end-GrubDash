const theatersService = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//List all of the movies
async function list(req, res, next) {
  const data = await theatersService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
