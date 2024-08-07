# Entertainment App API Documentation

Welcome to the Entertainment App API documentation. This API provides endpoints to access a wide range of movies, TV shows, trending content, user authentication, and user watchlists.

## Base URL

The base URL for all endpoints is: https://entertainment-app-backend-3huo.onrender.com/

## Authentication

Authentication is necessary for certain endpoints to utilize user-specific features like watchlists. The authentication process includes registering a new user, logging in, and obtaining a JSON Web Token (JWT) for future requests.

## Endpoints

### Movies

Movie-related endpoints allow users to get information about movies, search for movies, fetch details of a particular movie, get URLs and cast details, and more.

- `/movies`: Fetch all movies based on page number.
- `/movies/search`: Find movies based on titles.
- `/movies/:id`: Fetch details about a specific movie using its ID.
- `/movies/urls/:id`: Fetch movie URLs using their IDs.
- `/movies/cast/:id`: Fetch movie cast details using their IDs.

### TV Shows

TV show-related endpoints enable users to fetch TV shows, search for shows, get details of a particular show, get cast details, and more.

- `/tvshows`: Retrieve all TV shows based on page number.
- `/tvshows/search`: Search for TV shows based on titles.
- `/tvshows/:id`: Retrieve details about a single TV show based on its ID.
- `/tvshows/urls/:id`: Retrieve TV show URLs based on their IDs.
- `/tvshows/cast/:id`: Retrieve TV show cast based on their IDs.

### Trending

The trending endpoints allow users to fetch trending movies and TV shows.

- `/trending`: Retrieve all trending movies and TV shows.

### User

Endpoints related to user management enable users to register, login, logout, and manage their watchlists.

- `/user/register`: Register a new user.
- `/user/login`: Login as an existing user.
- `/user/logout`: Logout a user.
- `/user/details`: Get details of a user using JWT for persistent login.
- `/user/watchlist`: Get a user's watchlist.
- `/user/watchlist/:id`: Add new movies or TV shows to a user's watchlist based on ID.
- `/user/watchlist/:id`: Remove movies or TV shows from a user's watchlist based on ID.

## Error Handling

The API provides appropriate HTTP status codes along with error messages in case of errors. Ensure to handle these errors in your application.