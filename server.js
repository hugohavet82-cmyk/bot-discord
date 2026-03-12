const express = require('express');
const { createCanvas, loadImage } = require('canvas');

const app = express();

app.get('/carte', async (req, res) => {

const nom = req.query.nom || "Nom";
const prenom = req.query.prenom || "Prenom";
const naissance = req.query.naissance || "Date";
const lieu = req.query.lieu || "Lieu";
const nationalite = req.query.nationalite || "Nationalite";
const photo = req.query.photo;

const canvas = createCanvas(800, 500);
const ctx = canvas.getContext('2d');

const template = await loadImage('./template.png');
ctx.drawImage(template, 0, 0, 800, 500);

const id = Math.floor(Math.random() * 900000 + 100000);

ctx.fillStyle = "#1a1a1a";
ctx.font = "22px Arial";

ctx.fillText(nom, 380, 140);
ctx.fillText(prenom, 380, 172);
ctx.fillText(naissance, 380, 204);
ctx.fillText(lieu, 380, 236);
ctx.fillText(nationalite, 380, 268);
ctx.fillText(id.toString(), 380, 300);

ctx.font = "26px cursive";
ctx.fillText(prenom + " " + nom, 540, 365);

if(photo){
const avatar = await loadImage(photo);
ctx.drawImage(avatar, 70, 140, 150, 180);
}

const buffer = canvas.toBuffer("image/png");

res.set("Content-Type", "image/png");
res.send(buffer);

});

app.listen(3000, () => {
console.log("Serveur lancé sur http://localhost:3000");
});