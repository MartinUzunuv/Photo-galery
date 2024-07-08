import React from "react";

const Logout = () => {
  const onClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return <button onClick={onClick}>Logout</button>;
};

export default Logout;
