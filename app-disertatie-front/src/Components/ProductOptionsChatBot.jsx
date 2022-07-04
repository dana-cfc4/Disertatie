import React from "react";
import { useNavigate } from "react-router-dom";

import "./ProductOptionsChatBot.css";

const ProductOptionsChatBot = (props) => {
  const navigate = useNavigate()
  const options = [
    { text: "Cauta categorii", handler: () => { props.actionProvider.handleCautaDupaCategorie() }, id: 1 },
    { text: "Cauta brand-uri", handler: () => { props.actionProvider.handleCautaDupaBrand() }, id: 2 },
    {
      text: "Cauta produse",
      handler: () => { props.actionProvider.handleCautaDupaProdus() },
      id: 3,
    },
    {
      text: "Recomandare produse",
      handler: () => {
        props.actionProvider.handleRecomandareProduse()
        navigate('./recomandari')

      },
      id: 5,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default ProductOptionsChatBot;