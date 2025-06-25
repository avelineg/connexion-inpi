# siren-inpi-front

Frontend React pour tester la connexion et l'interrogation de l'API INPI via ton backend.

## Installation

```bash
npm install
npm start
```

## Utilisation

- Clique sur **Connexion INPI** (popup INPI si besoin).
- Entre un SIREN à 9 chiffres et clique sur **Rechercher**.
- Les infos principales INPI s'affichent si la session backend est active.

## À savoir

- Modifie `BACKEND_URL` dans `src/App.tsx` selon l'URL Render de ton backend.
- Les cookies de session sont envoyés automatiquement (`credentials: "include"`).
- Si tu reçois une erreur "Veuillez d'abord cliquer sur 'Connexion INPI'", c'est que la session INPI n'est pas active.
