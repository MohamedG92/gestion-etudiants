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
      <div className="empty">
        <p className="empty-title">Aucun client à afficher.</p>
        <p className="empty-text">Ajoutez un client avec le formulaire ci-dessus.</p>
      </div>
    );
  }

  return (
    <table className="client-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Entreprise</th>
          <th>Statut</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client._id}>
            <td data-label="Nom">
              <div className="client-name">
                <span className="avatar">{initiales(client.nom)}</span>
                {client.nom}
              </div>
            </td>
            <td data-label="Email" className="muted">{client.email}</td>
            <td data-label="Entreprise">{client.entreprise || <span className="muted">—</span>}</td>
            <td data-label="Statut">
              <select
                className={`statut statut-${client.statut}`}
                value={client.statut}
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
              <button className="btn-danger" onClick={() => onSupprimer(client._id)}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ClientList;
