const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// importer le serveur carte
require("./server")(app);

// route test
app.get("/", (req, res) => {
  res.send("API Carte identité active");
});

// démarrage serveur
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port " + PORT);
});