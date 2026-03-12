const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function createCard() {

    const canvas = createCanvas(800, 500);
    const ctx = canvas.getContext('2d');

    const template = await loadImage('./template.png');
    ctx.drawImage(template, 0, 0, 800, 500);

    const nom = "Dupont";
    const prenom = "Lucas";
    const naissance = "12/05/1998";
    const lieu = "Los Angeles";
    const nationalite = "American";
    const id = Math.floor(Math.random() * 900000 + 100000);

    ctx.fillStyle = "#1a1a1a";
    ctx.font = "22px Arial";

    ctx.fillText(nom, 380, 140);
    ctx.fillText(prenom, 380, 175);
    ctx.fillText(naissance, 380, 208);
    ctx.fillText(lieu, 380, 237);
    ctx.fillText(nationalite, 380, 270);
    ctx.fillText(id.toString(), 380, 305);

    ctx.font = "26px cursive";
    ctx.fillText("Lucas Dupont", 540, 375);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("carte.png", buffer);

    console.log("Carte créée !");
}

createCard();