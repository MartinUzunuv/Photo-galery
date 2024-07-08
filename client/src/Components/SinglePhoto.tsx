import React, { useState, FormEvent } from "react";
import axios from "axios";

interface Image {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

const SinglePhoto: React.FC = () => {
  const [imageId, setImageId] = useState<string>("");
  const [image, setImage] = useState<Image | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const name = localStorage.getItem("name");
    const pass = localStorage.getItem("pass");

    if (!(name && pass)) {
      setError("You must be logged in to view an image.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9000/image/${imageId}`,
        { name, pass }
      );
      if (response.data.message === "OK") {
        setImage(response.data.image);
        setError(null);
      } else {
        setError("Image not found or invalid credentials.");
        setImage(null);
      }
    } catch (error) {
      console.error("There was an error making the request:", error);
      setError("There was an error making the request.");
      setImage(null);
    }
  };

  return (
      <div>
          <h1>Find image by id</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageId">Enter Image ID:</label>
        <input
          type="text"
          id="imageId"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
        />
        <button type="submit">Fetch Image</button>
      </form>

      {error && <div>{error}</div>}

      {image && (
        <div>
          <img src={`data:image/png;base64,${image.image}`} alt={image._id} />
          <div>
            <h2>{image.title}</h2>
            <p>{image.description}</p>
            <p>ID: {image._id}</p>
            <p>Date: {new Date(image.date).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePhoto;
