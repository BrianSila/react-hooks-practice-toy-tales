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
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
