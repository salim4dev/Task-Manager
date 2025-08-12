// Définition du type possible pour l'état d'une tâche
export type TaskStatus = "pending" | "done";

// Définition de la structure d'une tâche
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
