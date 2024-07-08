import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const AddImage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("name", localStorage.getItem("name") || "");
    formData.append("pass", localStorage.getItem("pass") || "");

    try {
      const response = await axios.post(
        "http://localhost:9000/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data === "Image received and processed") {
        window.location.reload();
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div>
      <h1>Add Image</h1>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input type="text" value={title} onChange={handleTitleChange} />
        <br />
        <label>Description: </label>
        <textarea value={description} onChange={handleDescriptionChange} />
        <br />
        <label>Upload Image: </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
    </div>
  );
};

export default AddImage;
