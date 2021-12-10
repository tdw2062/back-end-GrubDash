# WeLoveMovies App

WeLoveMovies app is an app for users to get information about their favorite movies. The app represents a movies api. The user can make api calls on the back-end which delivers data via the movies database. Users can add movies, view theaters where their movie is playing, and peruse relevant reviews.

## Screenshots

Home Page

![moviePic](/images/reviews_for_movies.png)

## Technology

Built with:
-Node
-Express server framework
-CORS for safer request headers
-PostgreSQL database
-Knex.js for query building

## API Documentation

All get requests return JSON response. All post requests require application /json body, and return JSON response.

# Endpoints for data entries:

# /movies

Get Movies: GET /movies
-Successful get request will return an array of movie objects with the following fields:
-movie_id: integer
-title: string
-runtime_in_minutes: integer
-rating: string
-description: text
-image_url: string

Get 1 Movie: GET movies/:movieId
-Successful get request will return one specific movie with matching movie_id

Get Reviews of 1 Movie: GET movies/:movieId/reviews
-Successful get request will return the reviews of a specific movie (see /review for description of review object)

Get Theaters of 1 Movie: GET movies/:movieId/theaters
-Successful get request will return the theater listings of a specific movie (see /theater for description of theater object)

# /reviews

Get Reviews: GET /reviews
-Successful get request will return an array of review objects with the following fields:
-review_id: integer
-content: text
-score: integer
-critic_id: integer
-movie_id: integer

Get 1 Review: Get reviews/:reviewId
-Successful get request will return one specific reveiw with matching review_id
-Successful put request will update a review with matching review_id
-Successful delete request will delete the review with the given review_id

# /theaters

Get Theaters: GET /theaters
-Successful get request will return an array of theater objects with the following fields:
-theater_id: integer - name: string
-address_line_1: string
-address_line_2: string
-city: string
-state: string
-zip: string
