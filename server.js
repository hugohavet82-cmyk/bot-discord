const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();

app.get("/carte", async (req, res) => {
  try {

    const nom = req.query.nom || "Nom";
    const prenom = req.query.prenom || "Prenom";
    const naissance = req.query.naissance || "01/01/2000";
    const lieu = req.query.lieu || "Ville";
    const nationalite = req.query.nationalite || "Nationalite";
    const photo = req.query.photo;

    const canvas = createCanvas(800, 500);
    const ctx = canvas.getContext("2d");

    // background carte
    const background = await loadImage("./template.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // texte
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

    // photo joueur
    if (photo && photo.startsWith("http")) {
      const avatar = await loadImage(photo);
      ctx.drawImage(avatar, 70, 130, 130, 150);
    }

    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());

  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur génération carte");
  }
});

module.exports = app;