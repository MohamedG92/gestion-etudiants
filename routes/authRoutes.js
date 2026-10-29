const express = require("express");
const bcrypt = require("bcryptjs");
const Utilisateur = require("../models/Utilisateur");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { nom, email, password } = req.body;

        if (!nom || !email || !password) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Le mot de passe doit contenir au moins 8 caractères"
            });
        }

        const emailNormalise = email.trim().toLowerCase();

        const existe = await Utilisateur.findOne({
            email: emailNormalise
        });

        if (existe) {
            return res.status(409).json({
                message: "Cette adresse e-mail est déjà utilisée"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const utilisateur = await Utilisateur.create({
            nom,
            email: emailNormalise,
            password: passwordHash
        });

        res.status(201).json({
            message: "Compte créé avec succès",
            utilisateur: {
                id: utilisateur._id,
                nom: utilisateur.nom,
                email: utilisateur.email
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Cette adresse e-mail est déjà utilisée"
            });
        }

        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "E-mail et mot de passe obligatoires"
            });
        }

        const utilisateur = await Utilisateur.findOne({
            email: email.trim().toLowerCase()
        });

        if (!utilisateur) {
            return res.status(401).json({
                message: "Identifiants incorrects"
            });
        }

        const valide = await bcrypt.compare(
            password,
            utilisateur.password
        );

        if (!valide) {
            return res.status(401).json({
                message: "Identifiants incorrects"
            });
        }

        res.json({
            message: "Connexion réussie",
            utilisateur: {
                id: utilisateur._id,
                nom: utilisateur.nom,
                email: utilisateur.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
