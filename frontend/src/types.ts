// Etats possibles d'une tache
export enum Status {
    Pending = "pending",
    Done = "done",
  }
  
  //Définition de la structure d'une tàche
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
  }
  