const moviesService = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Helper function that checks whether a give movie exists
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

//Lists all of the movies
async function list(req, res, next) {
  if (!req.query.is_showing === "true") {
    const data = await moviesService.list();
    res.json({ data });
  } else {
    const data = await moviesService.showing();
    res.json({ data });
  }
}

//Lists all of the reviews
async function listReviews(req, res) {
  const reviews = await moviesService.listReviews(res.locals.movie.movie_id);

  res.json({ data: reviews });
}

//Reads a specific movie
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

//Lists all of the theters
async function listTheaters(req, res) {
  const theaters = await moviesService.listTheaters(res.locals.movie.movie_id);
  console.log("theaters", theaters);
  res.json({ data: theaters });
}

//Lists a specific movie
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
  read: [asyncErrorBoundary(movieExists), read],
};
