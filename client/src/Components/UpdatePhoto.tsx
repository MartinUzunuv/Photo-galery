import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

const UpdatePhoto: React.FC = () => {
  const [imageId, setImageId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const name = localStorage.getItem("name");
    const pass = localStorage.getItem("pass");

    if (!(name && pass)) {
      setError("You must be logged in to update an image.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9000/updateImage/${imageId}`,
        {
          name,
          pass,
          title,
          description,
        }
      );
      if (response.data.message === "OK") {
        setMessage("Image updated successfully.");
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
      <h1>Update Image</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageId">Enter Image ID to Update:</label>
        <input
          type="text"
          id="imageId"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
        />
        <br />
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <br />
        <button type="submit">Update Image</button>
      </form>

      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
    </div>
  );
};

export default UpdatePhoto;
