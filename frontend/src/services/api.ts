// Import de la librairie axios pour faire des requêtes HTTP
import axios from "axios";
import { Task, Status } from "../types";

// Configuration de l'instance axios avec l'URL de base de l'API
const api = axios.create({
  baseURL: "http://localhost:4000",
});

// Fonction pour récupérer toutes les tâches depuis le serveur
export const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

// Fonction pour créer une nouvelle tâche en envoyant titre et description
export const createTask = async (task: { title: string; description: string }): Promise<Task> => {
  const res = await api.post("/tasks", task);
  return res.data;
};

// Fonction pour supprimer une tâche via son id
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// Fonction pour modifier le statut d'une tâche (Pending, Done)
export const updateTaskStatus = async (id: string, status: Status): Promise<Task> => {
  const res = await api.patch(`/tasks/${id}`, { status });
  return res.data;
};
