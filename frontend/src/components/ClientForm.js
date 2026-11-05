import { useState } from "react";

function ClientForm({ onAjouter }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setEnvoi(true);
    const reussi = await onAjouter({ nom, email, entreprise });
    setEnvoi(false);

    if (reussi) {
      setNom("");
      setEmail("");
      setEntreprise("");
    }
  }

  return (
    <form className="card client-form" onSubmit={handleSubmit}>
      <h2>Nouveau client</h2>
      <div className="form-row">
        <label className="field">
          <span>Nom</span>
          <input
            placeholder="Sara Amrani"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            placeholder="sara@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Entreprise</span>
          <input
            placeholder="Atlas Digital"
            value={entreprise}
            onChange={(event) => setEntreprise(event.target.value)}
          />
        </label>
        <button type="submit" className="btn-primary" disabled={envoi}>
          {envoi ? "Ajout..." : "Ajouter"}
        </button>
      </div>
    </form>
  );
}

export default ClientForm;
