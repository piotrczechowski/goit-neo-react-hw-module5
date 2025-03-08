import { useEffect, useState } from "react";
import axios from "axios";

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDIxMWRmYTcxNjM3OWQ3YTZlNGQxMzg4MjczZDkxZCIsIm5iZiI6MTc0MTQyNDk1Ny40NDQsInN1YiI6IjY3Y2MwOTNkOWEzZjcwMTNmYTRmNzYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHbae0HFi88OWEI5YZZhhLTs7EDbY7AD9yiojfr0I4I",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (!reviews.length) return <p>No reviews available for this movie.</p>;

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <p>
            <strong>{review.author}</strong>
          </p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
