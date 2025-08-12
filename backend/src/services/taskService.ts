import { Task, TaskStatus } from "../types/task";
import { v4 as uuidv4 } from "uuid";

// Tableau qui va stocker toutes les tâches en mémoire
let tasks: Task[] = [];

//Récupère toutes les taches
export function getAllTasks(): Task[] {
  return tasks;
}

//crée une nouvelle tache
export function createTask(data: { title: string; description?: string }): Task {
  const task: Task = {
    id: uuidv4(),  // Génère un ID unique
    title: data.title,
    description: data.description ?? "",
    status: "pending"  //par défaut
  };
  tasks.push(task);
  return task;
}

//Supprime une tâche par son ID
export function deleteTaskById(id: string): boolean {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

//Met à jour le statut d'une tâche
export function updateTaskStatus(id: string, status: TaskStatus): Task | null {
  const t = tasks.find(t => t.id === id);
  if (!t) return null;
  t.status = status;
  return t;
}
