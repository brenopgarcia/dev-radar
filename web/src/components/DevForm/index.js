import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { GiTechnoHeart } from "react-icons/gi";
import { MdMyLocation } from "react-icons/md";

import "./styles.css";

export default function DevForm({ onSubmit, onEdit }) {
  const [githubUsername, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        setTimeout: 30000,
      }
    );
  }, []);

  useEffect(() => {
    setEdit(true);
    const { techs, github_username } = onEdit;

    setTechs(onEdit ? techs : "");
    setGithubUsername(onEdit ? github_username : "");
  }, [onEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      github_username: githubUsername,
      techs,
      latitude,
      longitude,
    });
    
    setEdit(false)

    setGithubUsername("");
    setTechs("");
  }

  async function handleEdit(e) {
    
    const { _id } = onEdit;

    e.preventDefault();

    await onSubmit({
      github_username: githubUsername,
      techs,
      _id,
    });

    setEdit(false)
    setGithubUsername("");
    setTechs("");
  }

  return (
    <form onSubmit={!edit ? handleSubmit : handleEdit}>
      <div className="input-block">
        <label htmlFor="github_username">
          <FaGithub color="#444" size={20} />
        </label>
        <input
          name="github_username"
          id="github_username"
          required
          value={githubUsername || ""}
          placeholder="Seu utilizador no Github"
          onChange={(e) => setGithubUsername(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">
          <GiTechnoHeart color="#444" size={20} />
        </label>
        <input
          name="techs"
          id="techs"
          required
          value={techs || ""}
          placeholder="Tecnologias que você domina"
          onChange={(e) => setTechs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block-label">
          <label htmlFor="latitude">Latitude</label>
          <div className="input-block">
            <label htmlFor="latitude">
              <MdMyLocation color="#444" size={20} />
            </label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
        </div>
        <div className="input-block-label">
          <label htmlFor="longitude">Longitude</label>
          <div className="input-block">
            <label htmlFor="longitude">
              <MdMyLocation color="#444" size={20} />
            </label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
