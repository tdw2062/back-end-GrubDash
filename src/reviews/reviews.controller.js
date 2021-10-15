const reviewsService = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Helper function that determines if a given review exits (by reviewId)
async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

//List all of the reviews
async function list(req, res, next) {
  const data = await reviewsService.list();
  res.json({ data });
}

//List a specific review
async function read(req, res) {
  res.json({ data: res.locals.review });
}

//Update a review
//This function utilizes both update and updateCritic from
//the .service file and combines the results, formatted correctly
async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const updated = await reviewsService.update(updatedReview);
  console.log("updated", updated);

  const withCritic = await reviewsService.updateCritic(updatedReview);
  console.log("withCritic", withCritic);

  withCritic[0].content = updated[0].content;
  withCritic[0].score = updated[0].score;

  res.json({ data: withCritic[0] });
}

//Delete a specific id (by review_id)
async function destroy(req, res) {
  await reviewsService.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
