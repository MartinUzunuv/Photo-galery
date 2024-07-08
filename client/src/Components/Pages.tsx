import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/pages.css"

const Pages = () => {
  const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0)

  useEffect(() => {
    if (!(localStorage.getItem("name") && localStorage.getItem("pass"))) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:9000/page/" + page, {
          name: localStorage.getItem("name"),
          pass: localStorage.getItem("pass"),
        })
        .then((response) => {
          if (response.data.message === "OK") {
            setImages(response.data.images);
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("There was an error making the request:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
    const cardWidth = window.innerWidth*0.3
    const imageHeigth = cardWidth*0.78

    return (
      <div className="pages">
        {images.map((image: any, i) => (
          <div style={{ width: cardWidth + "px" }} key={i}>
            <img
              width={cardWidth}
              height={imageHeigth}
              src={`data:image/png;base64,${image.image}`}
              alt={image._id}
            />
            <p>ID: {image._id}</p>
            <p>Date: {image.date}</p>
          </div>
        ))}
      </div>
    );
};

export default Pages;
