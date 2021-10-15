const { first } = require("../db/connection");
const knex = require("../db/connection");

const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//List all movies
function list() {
  return knex("movies").select("*");
}

//List only the movies showing (is_showing is true)
function showing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct(
      "m.movie_id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url"
    )
    .where({ is_showing: true });
}

//List the reviews of the movie by movie_id (also include the critic info)
function listReviews(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ movie_id })
    .then((resultArray) => {
      let newArray = [];
      for (let i = 0; i < resultArray.length; i++) {
        newArray[i] = addCritic(resultArray[i]);
      }
      return newArray;
    });
}

//List the theaters where a given movie is playing
function listTheaters(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.*")
    .where({ movie_id });
}

//Get info for a specific movie
function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
  list,
  listReviews,
  listTheaters,
  read,
  showing,
};
