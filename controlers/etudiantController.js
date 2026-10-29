const Etudiant = require("../models/Etudiant");

const getEtudiants = async (req, res) => {
    try {
        const etudiants = await Etudiant.find();
        res.json(etudiants);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const createEtudiant = async (req, res) => {
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
};

const updateEtudiant = async (req, res) => {
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
};

const deleteEtudiant = async (req, res) => {
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
};

module.exports = {
    getEtudiants,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant
};
