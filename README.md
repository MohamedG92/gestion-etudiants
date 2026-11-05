# CRM MERN — TP 2

CRM (gestion de clients) : React · Express · Node.js · MongoDB Atlas, déployé sur Vercel.

## Installation

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Lancement (2 terminaux)

```bash
# Terminal 1 — backend (http://localhost:4000)
cd backend && npm run dev

# Terminal 2 — frontend (http://localhost:3000)
cd frontend && npm start
```

## Variables d'environnement

| Variable | Où | En local | Sur Vercel |
|---|---|---|---|
| `MONGODB_URI` | backend/.env | URI Atlas (avec `/crm`) | URI Atlas |
| `FRONTEND_URL` | backend/.env | `http://localhost:3000` | Adresse du frontend Vercel (sans `/` final) |
| `PORT` | backend/.env | `4000` | À ne pas définir |
| `REACT_APP_API_URL` | frontend/.env | `http://localhost:4000/api/clients` | Adresse du backend Vercel + `/api/clients` |

Voir `backend/.env.example`. Les fichiers `.env` ne sont jamais publiés sur GitHub.

## API

| Méthode | Adresse | Succès |
|---|---|---|
| GET | /api/clients | 200 |
| GET | /api/clients/:id | 200 |
| POST | /api/clients | 201 |
| PATCH | /api/clients/:id | 200 |
| DELETE | /api/clients/:id | 200 |

Erreurs : 400 (validation / identifiant invalide), 404 (introuvable), 409 (email déjà utilisé), 500.
