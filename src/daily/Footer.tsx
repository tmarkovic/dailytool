import React from "react";

type FooterProps = {
  onReset: Function;
  onNext: Function;
}

const Footer = ({ onReset, onNext }: FooterProps) => {
  return (
    <div className="flex">
      <button
        className="btn btn-secondary btn-outline mr-2"
        value="Reset"
        onClick={() => onReset()}
      >
        reset
      </button>
      <button className="btn btn-primary" onClick={() => onNext()}>
        next
      </button>
    </div>
  );
};

export default Footer;
