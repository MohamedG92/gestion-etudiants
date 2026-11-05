import { Trash, UsersThree } from "@phosphor-icons/react";

function initiales(nom) {
  return nom
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((mot) => mot[0].toUpperCase())
    .join("");
}

function ClientList({ clients, onChangerStatut, onSupprimer }) {
  if (clients.length === 0) {
    return (
      <div className="card empty">
        <UsersThree size={36} weight="light" />
        <p className="empty-title">Aucun client à afficher.</p>
        <p className="empty-text">Ajoutez un client avec le formulaire ci-dessus.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <table className="client-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th>Statut</th>
            <th aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td data-label="Nom">
                <div className="client-name">
                  <span className="monogram" aria-hidden="true">
                    {initiales(client.nom)}
                  </span>
                  <span className="client-nom">{client.nom}</span>
                </div>
              </td>
              <td data-label="Email" className="secondary">{client.email}</td>
              <td data-label="Entreprise">
                {client.entreprise || <span className="tertiary">-</span>}
              </td>
              <td data-label="Statut">
                <select
                  className={`statut statut-${client.statut}`}
                  value={client.statut}
                  aria-label={`Statut de ${client.nom}`}
                  onChange={(event) =>
                    onChangerStatut(client._id, event.target.value)
                  }
                >
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                  <option value="inactif">Inactif</option>
                </select>
              </td>
              <td className="actions">
                <button
                  className="btn-delete"
                  onClick={() => onSupprimer(client._id)}
                  aria-label={`Supprimer ${client.nom}`}
                  title="Supprimer"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
