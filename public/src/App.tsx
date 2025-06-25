import React, { useState } from "react";

const BACKEND_URL = "https://check-vat-backend.onrender.com"; // Remplace par ton backend Render

type InpiEntreprise = {
  siren: string;
  denominationUniteLegale?: string;
  nomUniteLegale?: string;
  categorieJuridiqueUniteLegale?: string;
  activitePrincipaleUniteLegale?: string;
  dateCreationUniteLegale?: string;
};

function App() {
  const [siren, setSiren] = useState("");
  const [entreprise, setEntreprise] = useState<InpiEntreprise | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError(null);
    setEntreprise(null);
    if (!/^\d{9}$/.test(siren.trim())) {
      setError("Merci de saisir un SIREN à 9 chiffres.");
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch(
        `${BACKEND_URL}/inpi/entreprise/${siren.trim()}`,
        { credentials: "include" }
      );
      if (resp.status === 401) {
        setError("Veuillez d'abord cliquer sur 'Connexion INPI'.");
        setLoading(false);
        return;
      }
      if (!resp.ok) {
        setError("Erreur lors de l'appel à l'API INPI.");
        setLoading(false);
        return;
      }
      const data = await resp.json();
      if (data && data.uniteLegale) {
        setEntreprise(data.uniteLegale);
      } else {
        setError("Aucune donnée trouvée pour ce SIREN.");
      }
    } catch (e) {
      setError("Erreur réseau ou serveur.");
    }
    setLoading(false);
  };

  const handleInpiAuth = () => {
    window.location.href = `${BACKEND_URL}/inpi/auth/initiate`;
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Recherche INPI par SIREN</h2>
      <button onClick={handleInpiAuth} style={{ marginBottom: 16 }}>
        Connexion INPI
      </button>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="SIREN (9 chiffres)"
          value={siren}
          onChange={e => setSiren(e.target.value)}
          maxLength={9}
          style={{ fontSize: 18, width: 200, marginRight: 12 }}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </div>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {entreprise && (
        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
          <div><b>SIREN :</b> {entreprise.siren}</div>
          <div>
            <b>Dénomination :</b> {entreprise.denominationUniteLegale || entreprise.nomUniteLegale || "-"}
          </div>
          <div>
            <b>Catégorie juridique :</b> {entreprise.categorieJuridiqueUniteLegale || "-"}
          </div>
          <div>
            <b>Activité principale (APE) :</b> {entreprise.activitePrincipaleUniteLegale || "-"}
          </div>
          <div>
            <b>Date de création :</b> {entreprise.dateCreationUniteLegale || "-"}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;