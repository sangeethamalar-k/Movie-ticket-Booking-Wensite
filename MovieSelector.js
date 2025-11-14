import React from "react";

export default function MovieSelector({
  movies,
  theatres,
  selectedMovie,
  selectedTheatre,
  onChangeMovie,
  onChangeTheatre,
}) {
  return (
    <div className="card">
      <h2>Choose Movie & Theatre</h2>
      <label>
        Movie
        <select
          value={selectedMovie.id}
          onChange={(e) => onChangeMovie(movies.find(m => m.id === e.target.value))}
        >
          {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
        </select>
      </label>

      <label>
        Theatre
        <select
          value={selectedTheatre.id}
          onChange={(e) => onChangeTheatre(theatres.find(t => t.id === e.target.value))}
        >
          {theatres.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </label>
    </div>
  );
}
