import React, { useEffect, useState } from "react";

/*
 Reviews stored in localStorage keyed by 'reviews'
 Each review has: { id, target: 'movie'|'theatre', targetId, name, rating, text, createdAt }
*/

function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem("reviews") || "[]");
  } catch {
    return [];
  }
}

function saveReviews(reviews) {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

export default function ReviewSection({ movie, theatre }) {
  const [reviews, setReviews] = useState(loadReviews());
  const [form, setForm] = useState({
    target: "movie",
    name: "",
    rating: 5,
    text: "",
  });

  useEffect(() => {
    saveReviews(reviews);
  }, [reviews]);

  function submitReview(e) {
    e.preventDefault();
    const targetId = form.target === "movie" ? movie.id : theatre.id;
    const newR = {
      id: Date.now(),
      target: form.target,
      targetId,
      name: form.name || "Anonymous",
      rating: Number(form.rating),
      text: form.text,
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newR, ...prev]);
    setForm({ ...form, name: "", text: "" });
  }

  const movieReviews = reviews.filter(r => r.target === "movie" && r.targetId === movie.id);
  const theatreReviews = reviews.filter(r => r.target === "theatre" && r.targetId === theatre.id);

  return (
    <div className="card reviewcard">
      <h2>Reviews</h2>

      <form onSubmit={submitReview} className="review-form">
        <label>
          For:
          <select value={form.target} onChange={e => setForm({ ...form, target: e.target.value })}>
            <option value="movie">Movie</option>
            <option value="theatre">Theatre</option>
          </select>
        </label>

        <label>
          Name
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name (optional)" />
        </label>

        <label>
          Rating
          <select value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
          </select>
        </label>

        <label>
          Review
          <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="Write your review..." />
        </label>

        <button type="submit" className="btn btn-dark text-white">Post Review</button>
      </form>

      <div className="reviews-list">
        <h4>Movie Reviews ({movieReviews.length})</h4>
        {movieReviews.length === 0 && <div className="muted">No reviews yet for this movie.</div>}
        {movieReviews.map(r => (
          <div className="review-item" key={r.id}>
            <div className="rev-head"><strong>{r.name}</strong> — {r.rating}★</div>
            <div className="rev-body">{r.text}</div>
          </div>
        ))}

        <h4>Theatre Reviews ({theatreReviews.length})</h4>
        {theatreReviews.length === 0 && <div className="muted">No reviews yet for this theatre.</div>}
        {theatreReviews.map(r => (
          <div className="review-item" key={r.id}>
            <div className="rev-head"><strong>{r.name}</strong> — {r.rating}★</div>
            <div className="rev-body">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
