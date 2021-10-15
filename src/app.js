//Require Express and Dotenv
if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

//Require the routers
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

//Require the error handling functions
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

//Use Express
app.use(express.json());

//Use the routers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

//Use the error handling functions
app.use(notFound);
app.use(errorHandler);

module.exports = app;
