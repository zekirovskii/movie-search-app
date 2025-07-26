import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../api/tmdb';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const data = await getMovieCredits(movieId);
        const limitedCast = data.slice(0, 10);
        setCast(limitedCast);
      } catch (err) {
        setError('Failed to fetch cast');
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No cast information found.</p>;

  return (
    <section className={css.castSection}>
      <h2>Cast</h2>
      <ul className={css.castList}>
        {cast.map(actor => (
          <li key={actor.cast_id || actor.credit_id} className={css.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : '/placeholder-profile.jpg'
              }
              alt={actor.name}
              className={css.actorImage}
            />
            <p className={css.actorName}>{actor.name}</p>
            <p className={css.character}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
