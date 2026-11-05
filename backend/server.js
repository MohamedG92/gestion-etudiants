require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const clientRoutes = require("./routes/clients");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API CRM opérationnelle" });
});

app.use("/api/clients", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Connexion à la base impossible" });
  }
});

app.use("/api/clients", clientRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: "Requête invalide" });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

module.exports = app;
