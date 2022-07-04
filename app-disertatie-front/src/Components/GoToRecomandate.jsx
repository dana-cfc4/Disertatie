import React from "react";
import { useNavigate } from "react-router-dom";

import "./ProductOptionsChatBot.css";

const GoToRecomandate = (props) => {
  const navigate = useNavigate()
  const vezirecomandate = () => {
    navigate('/recomandari')
    props.actionProvider.handleRecomandareProduse()
  }
  const optionsMarkup = (
    <button
      className="learning-option-button"
      onClick={vezirecomandate}
    >
      Acceseaza sectiunea de produse recomandate
    </button>
  );

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default GoToRecomandate;