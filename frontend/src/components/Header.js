function Header({ total, stats }) {
  const statuts = [
    { cle: "prospect", label: "prospect", valeur: stats.prospect },
    { cle: "client", label: "client", valeur: stats.client },
    { cle: "inactif", label: "inactif", valeur: stats.inactif }
  ];

  return (
    <header className="header">
      <h1>Clients</h1>
      <p className="summary">
        <span>{total} client(s) enregistré(s)</span>
        {statuts.map((statut) => (
          <span key={statut.cle} className="summary-item">
            <span className={`dot dot-${statut.cle}`} aria-hidden="true" />
            {statut.valeur} {statut.label}{statut.valeur > 1 ? "s" : ""}
          </span>
        ))}
      </p>
    </header>
  );
}

export default Header;
