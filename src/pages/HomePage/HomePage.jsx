import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTrending() {
      try {
        setLoading(true);
        const results = await fetchTrendingMovies();
        setMovies(results);
      } catch (err) {
        setError('Failed to load trending movies');
      } finally {
        setLoading(false);
      }
    }

    loadTrending();
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.heading}>Trending Today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
