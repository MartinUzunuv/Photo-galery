import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/pages.css";

const Pages = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [cardWidth, setCardWidth] = useState(window.innerWidth * 0.3);
  const [imageHeight, setImageHeight] = useState(cardWidth * 0.78);

  useEffect(() => {
    const handleResize = () => {
      const newCardWidth = window.innerWidth * 0.3;
      setCardWidth(newCardWidth);
      setImageHeight(newCardWidth * 0.78);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!(localStorage.getItem("name") && localStorage.getItem("pass"))) {
      navigate("/login");
    } else {
      axios
        .post(`http://localhost:9000/page/${page}`, {
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
  }, [page, navigate]);

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <div className="pages">
        {images.map((image: any, i) => (
          <div style={{ width: `${cardWidth}px` }} key={i}>
            <img
              width={cardWidth}
              height={imageHeight}
              src={`data:image/png;base64,${image.image}`}
              alt={image._id}
            />
            <p>ID: {image._id}</p>
            <p>Date: {image.date}</p>
          </div>
        ))}
      </div>
      <div className="changePageButtons">
        <button onClick={handlePrevPage} disabled={page === 0}>
          ⏮️
        </button>
        <button onClick={handleNextPage} disabled={images.length < 6}>
          ⏭️
        </button>
      </div>
    </div>
  );
};

export default Pages;
