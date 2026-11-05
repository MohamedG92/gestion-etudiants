import { useEffect, useState } from "react";
import { AddressBook, MagnifyingGlass, UsersThree } from "@phosphor-icons/react";
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
          <AddressBook size={20} weight="fill" className="logo-icon" />
          <span className="logo-text">Mon CRM</span>
        </div>
        <nav className="nav" aria-label="Navigation">
          <span className="nav-item active" aria-current="page">
            <UsersThree size={18} weight="fill" />
            Clients
          </span>
        </nav>
        <div className="api-status">
          <span className={`api-dot ${connecte === false ? "off" : connecte ? "on" : "wait"}`} />
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
        <section className="group">
          <div className="list-toolbar">
            <h2 className="group-title">Liste ({clientsFiltres.length})</h2>
            <label className="search">
              <MagnifyingGlass size={15} />
              <input
                className="recherche"
                type="search"
                placeholder="Rechercher par nom ou email..."
                aria-label="Rechercher par nom ou email"
                value={recherche}
                onChange={(event) => setRecherche(event.target.value)}
              />
            </label>
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
