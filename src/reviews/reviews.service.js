const knex = require("../db/connection");

const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//List all reviews
function list() {
  return knex("reviews").select("*");
}

//Get one review by review_id
function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

//Delete a movie by review_id
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

//Update a review
//This will be combined with the response from updateCritic in the controller file
function update(updatedReview) {
  return knex("reviews as r")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return knex("reviews as r").where({
        "r.review_id": updatedReview.review_id,
      });
    });
}

//Use this with update to join the critic info to the updated review
function updateCritic(updatedReview) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": updatedReview.review_id })
    .then((result) => {
      result[0] = addCritic(result[0]);
      return result;
    });
}

module.exports = {
  list,
  delete: destroy,
  read,
  update,
  updateCritic,
};
