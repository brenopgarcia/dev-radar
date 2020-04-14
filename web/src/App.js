import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Main.css";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

function App() {
  const [devs, setDevs] = useState([]);
  const [activeEdit, setActiveEdit] = useState(false);
  const [editDev, setEditDev] = useState({});

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, [devs]);

  async function handleAddDev(data) {
    try {
      const response = await api.post("/devs", data);
      setDevs([...devs, response.data]);

      toast(`Dev ${response.data.name} was registered.`);
    } catch (err) {
      toast.error(`Error to register the dev.`, {
        closeButton: false,
      });
    }
  }

  async function handleUpdateDev(dev) {
    const { _id, github_username, techs } = dev;
    try {
      await api.put(`/devs/${_id}`, {
        techs: Array.isArray(techs) ? techs.join() : techs,
        github_username,
      });
      setDevs([...devs]);
      setActiveEdit(false);

      toast(`Dev ${dev.name ? dev.name : dev.github_username} was updated.`);
    } catch (error) {
      toast(`Something went wrong to remove ${dev.name}.`);
    }
  }

  async function handleEditDev(dev) {
    setActiveEdit(true);
    setEditDev(dev);
  }

  async function handleDeleteDev(id, name) {
    try {
      await api.delete(`/devs/${id}`);

      toast(`Dev ${name} was removed.`);
    } catch {
      toast.error("Dev cannot be removed.", {
        closeButton: false,
      });
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>{!activeEdit ? "Register" : "Edit"}</strong>
        <DevForm
          onSubmit={!activeEdit ? handleAddDev : handleUpdateDev}
          onEdit={editDev}
        />
      </aside>
      <main>
        <ul>
          {devs.map((dev) => (
            <DevItem
              dev={dev}
              key={dev._id}
              onDelete={handleDeleteDev}
              onEdit={handleEditDev}
            />
          ))}
        </ul>
      </main>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
