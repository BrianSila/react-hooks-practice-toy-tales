import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer() {
  const [Toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.log(`Error fetching: `, error));
  });
  return (
    <div id="toy-collection">
      {Toys.map((toy) => {
        return (
          <ToyCard
            key={toy.id}
            name={toy.name}
            image={toy.image}
            likes={toy.likes}
          />
        );
      })}
    </div>
  );
}

export default ToyContainer;
