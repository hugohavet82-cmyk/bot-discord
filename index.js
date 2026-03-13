const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require("./server")(app);

app.get("/", (req, res) => {
res.send("API carte identité active");
});

app.listen(PORT, () => {
console.log("Serveur lancé sur le port " + PORT);
});