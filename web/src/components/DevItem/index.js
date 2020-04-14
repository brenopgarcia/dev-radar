import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

import "./styles.css";

export default function DevItem({ dev, onDelete, onEdit }) {
  function deleteDev(e) {
    e.preventDefault();
    onDelete(dev._id, dev.name);
  }

  function editDev() {
    onEdit(dev);
  }

  return (
    <li className="dev-item">
      <header>
        <img
          src={dev.avatar_url}
          alt={dev.name}
        />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <button className="icon-edit">
        <MdEdit size={28} onClick={editDev}/>
      </button>
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
