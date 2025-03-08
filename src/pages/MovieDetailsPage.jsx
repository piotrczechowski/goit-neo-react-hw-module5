import {
  useParams,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";

// Lazy-load nested components
const MovieCast = lazy(() => import("../components/MovieCast.jsx"));
const MovieReviews = lazy(() => import("../components/MovieReviews.jsx"));

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDIxMWRmYTcxNjM3OWQ3YTZlNGQxMzg4MjczZDkxZCIsIm5iZiI6MTc0MTQyNDk1Ny40NDQsInN1YiI6IjY3Y2MwOTNkOWEzZjcwMTNmYTRmNzYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHbae0HFi88OWEI5YZZhhLTs7EDbY7AD9yiojfr0I4I",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <nav>
        <Link to="cast" state={{ from: location.state?.from || "/" }}>
          Cast
        </Link>
        <Link
          to="reviews"
          state={{ from: location.state?.from || "/" }}
          style={{ marginLeft: "1rem" }}
        >
          Reviews
        </Link>
      </nav>
      <Suspense fallback={<div>Loading additional info...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast movieId={movieId} />} />
          <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;
