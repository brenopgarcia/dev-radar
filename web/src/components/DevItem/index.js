import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

import "./styles.css";

export default function DevItem({ dev, onDelete }) {
  function deleteDev(e) {
    e.preventDefault();
    onDelete(dev._id);
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <div className="icon-edit">
        <MdEdit size={28} />
      </div>
      <button type="submit" className="icon-remove" onClick={deleteDev}>
        <MdDeleteForever size={28} />
      </button>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}
