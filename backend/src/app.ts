import express from "express";
// Importation de CORS (Cross-Origin Resource Sharing) 
// pour permettre au frontend (sur un autre port) d'accéder au backend
import cors from "cors";
import tasksRouter from "./routes/tasks";
import { ZodError } from "zod";

const app = express();

app.use(cors());

// Middleware pour parser automatiquement les requêtes JSON
app.use(express.json());

// Définition de la route principale "/tasks" qui utilise le routeur des tâches
app.use("/tasks", tasksRouter);

// Middleware de gestion  des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  // Si l'erreur vient de Zod (validation des données côté backend)
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Validation error", issues: err.flatten() });
  }
  // Sinon, renvoie un message générique
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

export default app;
