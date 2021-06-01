import React from "react";

const Footer = ({}) => {
  return (
    <div className="flex">
      <button
        className="btn btn-secondary btn-outline mr-2"
        secondary
        value="Reset"
        // onClick={() => dispatch({ type: "resetNames" })}
      >
        reset
      </button>
      <button
        className="btn btn-primary"
        // onClick={() => handleRemoveName(state.names[0].id)}
      >
        next
      </button>
    </div>
  );
};

export default Footer;
