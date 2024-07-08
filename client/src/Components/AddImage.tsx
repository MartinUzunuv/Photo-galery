import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const AddImage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
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
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Upload Image: </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
    </div>
  );
};

export default AddImage;
