import React from "react";

function ToyForm({ formData, onFormChange, onFormSubmit }) {
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={onFormSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          value={formData.name}
          onChange={onFormChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          value={formData.image}
          onChange={onFormChange}
        />
        <button type="submit">Add Toy</button>
      </form>
    </div>
  );
}

export default ToyForm;
