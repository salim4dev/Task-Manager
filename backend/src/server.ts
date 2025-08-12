import app from "./app";

const PORT = process.env.PORT ?? 4000;

// Démarrage du serveur backend et écoute sur le port choisi
app.listen(PORT, () => {
  console.log(`Server started, listening on http://localhost:${PORT}`);
});
