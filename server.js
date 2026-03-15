const { createCanvas, loadImage } = require("canvas");

module.exports = (app) => {

//////////////////////////////////////
// CARTE D'IDENTITÉ
//////////////////////////////////////

app.get("/carte", async (req, res) => {

const { nom, prenom, naissance, lieu, nationalite } = req.query;

const canvas = createCanvas(900, 550);
const ctx = canvas.getContext("2d");

const background = await loadImage("./template.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.font = "20px Arial";
ctx.fillStyle = "black";

ctx.fillText(nom || "", 380, 152);
ctx.fillText(prenom || "", 400, 192);
ctx.fillText(naissance || "", 420, 225);
ctx.fillText(lieu || "", 430, 261);
ctx.fillText(nationalite || "", 420, 298);

const idCarte = Math.floor(100000 + Math.random() * 900000);
ctx.fillText(idCarte, 410, 335);

ctx.font = "22px cursive";
ctx.fillText((prenom || "") + " " + (nom || ""), 600, 420);

res.set("Content-Type", "image/png");
res.end(canvas.toBuffer());

});

//////////////////////////////////////
// PERMIS
//////////////////////////////////////

app.get("/permis", async (req, res) => {

const { nom, prenom, date_voiture, date_moto, date_camion } = req.query;

const canvas = createCanvas(900, 550);
const ctx = canvas.getContext("2d");

const background = await loadImage("./permis.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.font = "22px Arial";
ctx.fillStyle = "black";

ctx.fillText(nom || "", 385, 132);
ctx.fillText(prenom || "", 430, 165);

// dates seulement (pas "obtenu le")
ctx.fillText(date_voiture || "Non obtenu", 470, 258);
ctx.fillText(date_moto || "Non obtenu", 470, 330);
ctx.fillText(date_camion || "Non obtenu", 470, 400);

res.set("Content-Type", "image/png");
res.end(canvas.toBuffer());

});

};