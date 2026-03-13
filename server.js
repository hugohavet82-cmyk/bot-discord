const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();

app.get("/carte", async (req, res) => {
  try {

    const nom = req.query.nom || "Nom";
    const prenom = req.query.prenom || "Prenom";
    const naissance = req.query.naissance || "Date";
    const lieu = req.query.lieu || "Lieu";
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

    ctx.fillText(nom, 350, 200);
    ctx.fillText(prenom, 350, 240);
    ctx.fillText(naissance, 350, 280);
    ctx.fillText(lieu, 350, 320);
    ctx.fillText(nationalite, 350, 360);

    // photo joueur
    if (photo && photo.startsWith("http")) {
      const avatar = await loadImage(photo);
      ctx.drawImage(avatar, 80, 150, 150, 180);
    }

    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur génération carte");
  }
});

module.exports = app;