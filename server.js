require("dotenv").config();
const Etudiant = require("./models/Etudiant");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Mon premier serveur MERN !");
});

app.get("/api/test", (req, res) => {
    res.json({ message: "L'API fonctionne correctement" });
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB est connecté");
        app.listen(PORT, () => {
            console.log(`Serveur lancé sur le port ${PORT}`);
        });
    } catch (error) {
        console.error("Erreur MongoDB :", error.message);
        process.exit(1);
    }
}
app.get("/api/etudiants", async (req, res) => {
    try {
        const etudiants = await Etudiant.find();
        res.json(etudiants);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});
app.post("/api/etudiants", async (req, res) => {
    try {
        const nouvelEtudiant = new Etudiant({
            nom: req.body.nom,
            email: req.body.email,
            age: req.body.age
        });
        const resultat = await nouvelEtudiant.save();
        res.status(201).json(resultat);
    } catch (error) {
        res.status(400).json({
            message: "Impossible de créer l'étudiant"
        });
    }
});
app.put("/api/etudiants/:id", async (req, res) => {
    try {
        const etudiant = await Etudiant.findByIdAndUpdate(
            req.params.id,
            {
                nom: req.body.nom,
                email: req.body.email,
                age: req.body.age
            },
            { new: true, runValidators: true }
        );
        if (!etudiant) {
            return res.status(404).json({
                message: "Étudiant introuvable"
            });
        }
        res.json(etudiant);
    } catch (error) {
        res.status(400).json({
            message: "Modification impossible"
        });
    }
});
app.delete("/api/etudiants/:id", async (req, res) => {
    try {
        const etudiant = await Etudiant.findByIdAndDelete(req.params.id);
        if (!etudiant) {
            return res.status(404).json({
                message: "Étudiant introuvable"
            });
        }
        res.json({ message: "Étudiant supprimé" });
    } catch (error) {
        res.status(400).json({
            message: "Suppression impossible"
        });
    }
});
startServer();