import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    likes: 0,
  });
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((toys) => setToys(toys))
      .catch((error) => console.log(`Error fetching toys: `, error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newToy) => {
        setToys((prevToys) => [...prevToys, newToy]);
        setFormData({ name: "", image: "", likes: 0 });
      })
      .catch((error) => console.log(`Error posting: `, error));
  }

  function handleLikeChange(id) {
    const toy = toys.find((toy) => toy.id === id);
    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((prevToys) =>
          prevToys.map((toy) =>
            toy.id === id ? { ...toy, likes: updatedToy.likes } : toy
          )
        );
      })
      .catch((error) => console.log(`Error updating likes: `, error));
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToys((prevToys) => prevToys.filter((toy) => toy.id !== id));
      })
      .catch((error) => console.log(`Error deleting toy: `, error));
  }

  return (
    <>
      <Header />
      {showForm ? (
        <ToyForm
          formData={formData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
      ) : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        OnLikeChange={handleLikeChange}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
