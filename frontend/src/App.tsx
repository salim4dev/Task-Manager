

import { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask, updateTaskStatus } from "./services/api";
import { Task, Status } from "./types";


//composant principal App
export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]); //stocker la liste des tâches
  const [title, setTitle] = useState("");  //stocker le titre d'une nouvelle tâche
  const [description, setDescription] = useState(""); //stocker la description d'une nouvelle tâche

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  // Fonction appelée au clic pour ajouter une nouvelle tâche
  const handleAdd = async () => {
    if (!title || !description) return;
    const newTask = await createTask({ title, description });
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDescription("");
  };

  // Fonction pour supprimer une tâche par son id
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Fonction pour basculer le statut d'une tâche (Pending <-> Done)
  const toggleStatus = async (task: Task) => {
    const updated = await updateTaskStatus(
      task.id,
      task.status === Status.Pending ? Status.Done : Status.Pending
    );
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  // Fonction qui retourne une classe CSS pour la couleur selon le statut (orange: pending, vert: done)
  const statusColor = (status: Status) =>
    status === Status.Pending ? "bg-warning" : "bg-success";

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">


          <h1 className="text-center mb-4">📝 Gestionnaire de tâches</h1>

          {/* Formulaire */}
          <div className="card shadow-sm p-3 mb-4">
            <input
              type="text"
              placeholder="Titre"
              className="form-control mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="form-control mb-2"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleAdd}>
              ➕ Ajouter
            </button>
          </div>

          {/* Liste des tâches */}
          <div className="list-group">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                {/* Status + infos */}
                <div className="d-flex align-items-center">
                  <span
                    className={`rounded-circle me-3 ${statusColor(task.status)}`}
                    style={{ width: "15px", height: "15px", display: "inline-block" }}
                  ></span>
                  <div>
                    <h5 className="mb-1">{task.title}</h5>
                    <p className="mb-1 text-muted">{task.description}</p>
                  </div>
                </div>

                {/* Boutons */}
                <div className="btn-group">
                  <button
                    className={`btn btn-sm ${
                      task.status === Status.Pending ? "btn-success" : "btn-warning"
                    }`}
                    onClick={() => toggleStatus(task)} // Bascule le statut au clic
                  >
                    {task.status === Status.Pending
                      ? "Marquer comme fait"
                      : "Remettre en attente"}
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(task.id)} // Supprime la tâche au clic
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

