import express from "express";
import * as service from "../services/taskService";
import { createTaskSchema, updateStatusSchema } from "../schemas/taskSchema";

// Création d'un routeur Express
const router = express.Router();

//Récupère et renvoie toutes les tâches
router.get("/", (req, res) => {
  res.json(service.getAllTasks());
});

//Crée une nouvelle tâche après validation des données
router.post("/", (req, res, next) => {
  try {
    const parsed = createTaskSchema.parse(req.body); // validation avec Zod
    const created = service.createTask(parsed);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

//Supprime une tâche par son ID
router.delete("/:id", (req, res) => {
  const ok = service.deleteTaskById(req.params.id);
  if (!ok) return res.status(404).json({ message: "Task not found" });
  res.status(204).send();
});

//Met à jour le statut d'une tâche après validation
router.patch("/:id", (req, res, next) => {
  try {
    const parsed = updateStatusSchema.parse(req.body);
    const updated = service.updateTaskStatus(req.params.id, parsed.status);
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
