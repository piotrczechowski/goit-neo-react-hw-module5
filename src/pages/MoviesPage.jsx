import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchQuery}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDIxMWRmYTcxNjM3OWQ3YTZlNGQxMzg4MjczZDkxZCIsIm5iZiI6MTc0MTQyNDk1Ny40NDQsInN1YiI6IjY3Y2MwOTNkOWEzZjcwMTNmYTRmNzYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHbae0HFi88OWEI5YZZhhLTs7EDbY7AD9yiojfr0I4I",
          },
        }
      );
      setMovies(response.data.results);
      setSearchParams({ query: searchQuery });
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  // Optionally, run a search automatically if initialQuery is present
  useEffect(() => {
    if (initialQuery) {
      // Trigger search when the component mounts if there's an initial query in the URL
      (async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${initialQuery}`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDIxMWRmYTcxNjM3OWQ3YTZlNGQxMzg4MjczZDkxZCIsIm5iZiI6MTc0MTQyNDk1Ny40NDQsInN1YiI6IjY3Y2MwOTNkOWEzZjcwMTNmYTRmNzYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHbae0HFi88OWEI5YZZhhLTs7EDbY7AD9yiojfr0I4I",
              },
            }
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching movies with initial query:", error);
        }
      })();
    }
  }, [initialQuery]);

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
