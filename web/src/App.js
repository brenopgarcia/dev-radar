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

      toast(`Dev ${response.data.name} registado.`);
    } catch {
      toast.error(`Erro ao registar o dev.`, {
        closeButton: false,
      });
    }
  }

  async function handleDeleteDev(id) {
    try {
      await api.delete(`/devs/${id}`);
      
      console.log(setDevs(devs.filter((dev) => dev._id !== id)))

      toast("Dev removido.");
    } catch {
      toast.error("Erro ao remover o dev.", {
        closeButton: false,
      });
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Registar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map((dev) => (
            <DevItem
              dev={dev}
              key={dev._id}
              onDelete={handleDeleteDev}
              // onEdit={handleEditDev}
            />
          ))}
        </ul>
      </main>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
