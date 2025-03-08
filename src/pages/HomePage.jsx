import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDIxMWRmYTcxNjM3OWQ3YTZlNGQxMzg4MjczZDkxZCIsIm5iZiI6MTc0MTQyNDk1Ny40NDQsInN1YiI6IjY3Y2MwOTNkOWEzZjcwMTNmYTRmNzYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHbae0HFi88OWEI5YZZhhLTs7EDbY7AD9yiojfr0I4I",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
