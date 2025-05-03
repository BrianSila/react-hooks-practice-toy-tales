import React from "react";

function ToyCard({ toy, OnLikeChange, onDelete }) {
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes</p>
      <button className="like-btn" onClick={() => OnLikeChange(toy.id)}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={() => onDelete(toy.id)}>
        Donate to Goodwill
      </button>
    </div>
  );
}

export default ToyCard;
