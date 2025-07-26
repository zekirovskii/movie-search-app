import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../api/tmdb';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const { title, poster_path, vote_average, overview, genres, release_date } = movie;

  return (
    <main className={css.container}>
      <Link to={backLinkRef.current} className={css.backLink}>← Go back</Link>

      <div className={css.details}>
        {poster_path && (
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={title}
          />
        )}

        <div className={css.info}>
          <h1>{title} ({release_date?.slice(0, 4)})</h1>
          <p><strong>User Score:</strong> {Math.round(vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p>{genres.map(g => g.name).join(' ')}</p>
        </div>
      </div>

      <div className={css.additional}>
        <p>Additional information</p>
        <ul>
          <li><NavLink to="cast" className={css.subLink}>Cast</NavLink></li>
          <li><NavLink to="reviews" className={css.subLink}>Reviews</NavLink></li>
        </ul>
      </div>

      <Outlet />
    </main>
  );
}
