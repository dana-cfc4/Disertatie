import React from "react";
import { Link } from "react-router-dom";
import "./LinkList.css";

const LinkList = (props) => {
  const linkMarkup = props.options.map((link) => (

    link.url !== '/branduri' ?
      <li key={link.id} className="link-list-item">
        <Link to={link.url} className="link-list-item-url">
          {link.text}
        </Link>
      </li> : <li key={link.id} onClick={props.actionProvider.handleCautaOrice} className="link-list-item">
        <p className="link-list-item-url">
          {link.text}
        </p>
      </li>
  ));

  return <ul className="link-list">{linkMarkup}</ul>;
};

export default LinkList;