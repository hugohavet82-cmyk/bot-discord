const { createCanvas, loadImage } = require("canvas");

module.exports = (app) => {

app.get("/carte", async (req, res) => {

res.setHeader("Content-Type", "image/png");

try {

// récupérer les paramètres
const nom = req.query.nom || "...";
const prenom = req.query.prenom || "...";
const naissance = req.query.naissance || "...";
const lieu = req.query.lieu || "...";
const nationalite = req.query.nationalite || "...";

// créer canvas
const canvas = createCanvas(800, 500);
const ctx = canvas.getContext("2d");

// charger le template
const background = await loadImage("./template.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

// texte carte
ctx.font = "20px Arial";
ctx.fillStyle = "black";

ctx.fillText(nom, 380, 140);
ctx.fillText(prenom, 380, 172);
ctx.fillText(naissance, 380, 204);
ctx.fillText(lieu, 380, 236);
ctx.fillText(nationalite, 380, 268);

// génération ID carte
const idCarte = Math.floor(100000 + Math.random() * 900000);
ctx.fillText(idCarte, 380, 300);

// signature
ctx.font = "22px cursive";
ctx.fillText(prenom + " " + nom, 540, 400);

// envoyer image
res.end(canvas.toBuffer());

} catch (err) {

console.error(err);
res.status(500).send("Erreur génération carte");

}

});

};