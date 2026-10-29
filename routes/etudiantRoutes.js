const express = require("express");
const {
    getEtudiants,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant
} = require("../controlers/etudiantController");

const router = express.Router();

router.get("/", getEtudiants);
router.post("/", createEtudiant);
router.put("/:id", updateEtudiant);
router.delete("/:id", deleteEtudiant);

module.exports = router;
