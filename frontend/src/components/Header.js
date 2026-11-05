function Header({ total, stats }) {
  const cartes = [
    { label: "Total", valeur: total, classe: "stat-total" },
    { label: "Prospects", valeur: stats.prospect, classe: "stat-prospect" },
    { label: "Clients", valeur: stats.client, classe: "stat-client" },
    { label: "Inactifs", valeur: stats.inactif, classe: "stat-inactif" }
  ];

  return (
    <header className="header">
      <div className="header-top">
        <div>
          <p className="eyebrow">Tableau de bord</p>
          <h1>Mon CRM</h1>
          <p className="subtitle">{total} client(s) enregistré(s)</p>
        </div>
      </div>
      <div className="stats">
        {cartes.map((carte) => (
          <div key={carte.label} className={`stat ${carte.classe}`}>
            <span className="stat-label">{carte.label}</span>
            <span className="stat-value">{carte.valeur}</span>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
