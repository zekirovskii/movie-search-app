import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api/tmdb';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <section className={css.reviewSection}>
      <h2>Reviews</h2>
      <ul className={css.reviewList}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={css.reviewItem}>
            <h3 className={css.author}>{author}</h3>
            <p className={css.content}>{content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
