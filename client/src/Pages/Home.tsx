import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home: React.FC = () => {
const navigate = useNavigate();

  useEffect(() => {
    if (!(localStorage.getItem("name") && localStorage.getItem("pass"))) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:9000/login", {
          name: localStorage.getItem("name"),
          pass: localStorage.getItem("pass"),
        })
        .then((response) => {
          if (response.data === "OK") {
            console.log("everything ok, continue");
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

  return <div>Home</div>;
};

export default Home;
