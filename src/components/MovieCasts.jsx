import { useEffect, useState } from "react";
import axios from "axios";

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDIxMWRmYTcxNjM3OWQ3YTZlNGQxMzg4MjczZDkxZCIsIm5iZiI6MTc0MTQyNDk1Ny40NDQsInN1YiI6IjY3Y2MwOTNkOWEzZjcwMTNmYTRmNzYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHbae0HFi88OWEI5YZZhhLTs7EDbY7AD9yiojfr0I4I",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast information:", error);
      }
    };
    fetchCast();
  }, [movieId]);

  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul>
      {cast.map((member) => (
        <li key={member.cast_id}>
          {member.name} as {member.character}
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
