import React, { useEffect, useState } from "react";
import Link from "next/link";

import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireWorks } from "../lib/utils";

const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } =
    useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireWorks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Merci pour votre achat</h2>
        <p className="email-msg">
          Verifiez votre email pour voir le suivis de votre commande
        </p>
        <p className="description">
          Si vous avez une question, n'hésitez pas à m'envoyez moi un
          mail.
          <a href="mailto:vascbarreiros@gmail.com" className="email">
            vascbarreiros@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continuez votre shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
