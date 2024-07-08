import React, { useState, FormEvent } from "react";
import axios from "axios";

const DeletePhoto: React.FC = () => {
  const [imageId, setImageId] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const name = localStorage.getItem("name");
    const pass = localStorage.getItem("pass");

    if (!(name && pass)) {
      setError("You must be logged in to delete an image.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9000/deleteImage/${imageId}`,
        { name, pass }
      );
      if (response.data.message === "OK") {
        setMessage("Image deleted successfully.");
        setError(null);
        window.location.reload();
      } else {
        setError("Image not found or invalid credentials.");
        setMessage(null);
      }
    } catch (error) {
      console.error("There was an error making the request:", error);
      setError("There was an error making the request.");
      setMessage(null);
    }
  };

  return (
      <div>
          <h1>Delete Image</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageId">Enter Image ID to Delete:</label>
        <input
          type="text"
          id="imageId"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
        />
        <button type="submit">Delete Image</button>
      </form>

      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
    </div>
  );
};

export default DeletePhoto;
