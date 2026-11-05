import { useEffect, useState } from "react";
import Header from "./components/Header";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient
} from "./services/clientService";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [message, setMessage] = useState("Chargement...");
  const [typeMessage, setTypeMessage] = useState("info");
  const [connecte, setConnecte] = useState(null);

  function afficher(texte, type) {
    setMessage(texte);
    setTypeMessage(type);
  }

  useEffect(() => {
    getClients()
      .then((data) => {
        setClients(data);
        setMessage("");
        setConnecte(true);
      })
      .catch((error) => {
        afficher(error.message, "erreur");
        setConnecte(false);
      });
  }, []);

  useEffect(() => {
    if (typeMessage !== "succes" || !message) {
      return;
    }
    const minuteur = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(minuteur);
  }, [message, typeMessage]);

  async function ajouterClient(nouveauClient) {
    try {
      const clientCree = await createClient(nouveauClient);
      setClients([clientCree, ...clients]);
      afficher("Client ajouté !", "succes");
      return true;
    } catch (error) {
      afficher(error.message, "erreur");
      return false;
    }
  }

  async function changerStatut(id, statut) {
    try {
      const clientModifie = await updateClient(id, { statut });
      setClients(clients.map((c) => (c._id === id ? clientModifie : c)));
      afficher("Statut modifié !", "succes");
    } catch (error) {
      afficher(error.message, "erreur");
    }
  }

  async function supprimerClient(id) {
    if (!window.confirm("Supprimer ce client ?")) {
      return;
    }
    try {
      await deleteClient(id);
      setClients(clients.filter((c) => c._id !== id));
      afficher("Client supprimé !", "succes");
    } catch (error) {
      afficher(error.message, "erreur");
    }
  }

  const clientsFiltres = clients.filter((c) =>
    (c.nom + " " + c.email).toLowerCase().includes(recherche.toLowerCase())
  );

  const stats = {
    prospect: clients.filter((c) => c.statut === "prospect").length,
    client: clients.filter((c) => c.statut === "client").length,
    inactif: clients.filter((c) => c.statut === "inactif").length
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-mark">C</span>
          <span className="logo-text">Mon CRM</span>
        </div>
        <nav className="nav">
          <span className="nav-item active">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Clients
          </span>
        </nav>
        <div className="sidebar-footer">
          <span className={`status-dot ${connecte === false ? "off" : connecte ? "" : "wait"}`} />
          {connecte === null ? "Connexion..." : connecte ? "API connectée" : "API hors ligne"}
        </div>
      </aside>

      <main className="main">
        <Header total={clients.length} stats={stats} />
        <ClientForm onAjouter={ajouterClient} />
        {message && (
          <p className={`message message-${typeMessage}`} role="status">
            {message}
          </p>
        )}
        <section className="card">
          <div className="list-toolbar">
            <div>
              <h2>Clients</h2>
              <p className="card-sub">{clientsFiltres.length} affiché(s)</p>
            </div>
            <div className="search">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                className="recherche"
                type="search"
                placeholder="Rechercher par nom ou email..."
                value={recherche}
                onChange={(event) => setRecherche(event.target.value)}
              />
            </div>
          </div>
          <ClientList
            clients={clientsFiltres}
            onChangerStatut={changerStatut}
            onSupprimer={supprimerClient}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
