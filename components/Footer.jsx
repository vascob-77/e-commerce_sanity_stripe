import Link from "next/link";
import React from "react";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>©2022 Vasco</p>
      <a target="_blank" href="https://www.linkedin.com/in/vasco-barreiros/" className="icons">
        <AiFillLinkedin />
      </a>
    </div>
  );
};

export default Footer;
