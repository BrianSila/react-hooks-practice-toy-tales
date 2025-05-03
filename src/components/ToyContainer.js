import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, OnLikeChange, onDelete }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          OnLikeChange={OnLikeChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
