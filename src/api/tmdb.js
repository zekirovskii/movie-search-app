const API_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmE1NDg5OWRlYWY0ZmNkZmM3YjA1NmEwYTJmOGY4ZSIsIm5iZiI6MTc0NjM2OTcxNi43NjYsInN1YiI6IjY4MTc3Y2I0OTEyNmI3YTJmOWEyMTUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tSJ_VM7kE8-Wi58mkopVP2jigjbmWB2lVJBKJ4Yj_-c'; 

const options = {
  headers: {
    Authorization: AUTH_TOKEN,
  },
};

export async function fetchTrendingMovies() {
  const res = await fetch(`${API_URL}/trending/movie/day`, options);
  const data = await res.json();
  return data.results;
}

export async function searchMovies(query) {
  const res = await fetch(
    `${API_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
    options
  );
  const data = await res.json();
  return data.results;
}


export async function getMovieDetails(movieId) {
  const res = await fetch(`${API_URL}/movie/${movieId}?language=en-US`, options);
  const data = await res.json();
  return data;
}

export async function getMovieCredits(movieId) {
  const res = await fetch(`${API_URL}/movie/${movieId}/credits?language=en-US`, options);
  const data = await res.json();
  return data.cast;
}

export async function getMovieReviews(movieId) {
  const res = await fetch(`${API_URL}/movie/${movieId}/reviews?language=en-US&page=1`, options);
  const data = await res.json();
  return data.results;
}

