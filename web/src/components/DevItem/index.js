import React from "react";
import { MdEdit, MdDeleteForever, MdStar } from "react-icons/md";

import "./styles.css";

export default function DevItem({ dev, onDelete, onEdit }) {
  function deleteDev(e) {
    e.preventDefault();
    onDelete(dev._id, dev.name);
  }

  function editDev() {
    onEdit(dev);
  }

  return dev.github_username === "brenopgarcia" ? (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <div className="icon-star">
        <MdStar size={28} />
      </div>
      <p>{dev.bio}</p>
      <a
        href={`https://github.com/${dev.github_username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Github profile
      </a>
    </li>
  ) : (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name ? dev.name : dev.github_username}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <div className="icon-edit">
        <MdEdit size={28} onClick={editDev} />
      </div>
      <div type="submit" className="icon-remove" onClick={deleteDev}>
        <MdDeleteForever size={28} />
      </div>
      <p>{dev.bio ? dev.bio : 'Without biography on Github' }</p>
      <a
        href={`https://github.com/${dev.github_username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Github profile
      </a>
    </li>
  );
}
