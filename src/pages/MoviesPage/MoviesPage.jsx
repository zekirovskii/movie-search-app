import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    setSearchParams({ query });
  };

  useEffect(() => {
    const currentQuery = searchParams.get('query');
    if (!currentQuery) return;

    async function fetchData() {
      try {
        setLoading(true);
        const results = await searchMovies(currentQuery);
        setMovies(results);
        setError('');
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchParams]);

  return (
    <main className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={css.input}
          placeholder="Search for a movie..."
        />
        <button type="submit" className={css.button}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
