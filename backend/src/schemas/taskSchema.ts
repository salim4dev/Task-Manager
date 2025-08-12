// Importation de Zod, une bibliothèque pour valider les données
import { z } from "zod";

//Schéma de validation pour la création d'une tâche (titre + description)
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default("")
});

//Schéma de validation pour la mise à jour du statut d'une tâche
export const updateStatusSchema = z.object({
    status: z.enum(["pending", "done"])

});
