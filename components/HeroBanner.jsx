import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.product}</p>
      </div>
      <h3>{heroBanner.midText}</h3>
      <img
        src={urlFor(heroBanner.image)}
        alt="casque audio"
        className="hero-banner-image"
      />

      <div>
      {console.log(heroBanner)}
        <Link href={`/product/jabra-elite`}>
          <button type="button">{heroBanner.buttonText}</button>
        </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;