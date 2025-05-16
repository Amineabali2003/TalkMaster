# TalkMaster

Application de gestion de conférences techniques avec rôles multiples : conférenciers, organisateurs et public.

## Fonctionnalités

### Conférenciers
- Proposer, modifier ou supprimer un talk
- Suivre le statut : en attente, accepté, planifié

### Organisateurs
- Valider ou refuser des talks
- Planifier manuellement les talks (créneau, salle)
- Accéder à la liste des talks en attente

### Public
- Consulter le planning des talks planifiés
- Filtrer par jour, salle, sujet ou niveau
- Ajouter aux favoris et exporter au format .ics

## Stack Technique

- **Frontend** : Next.js, Tailwind CSS, React Big Calendar, ShadCN UI
- **Backend** : Node.js, Express, Prisma, PostgreSQL
- **Librairies** :
  - Auth : JWT, cookie-parser
  - Emails : Nodemailer
  - Sécurité : Bcrypt
  - Planning : ical-generator

## Installation

```bash
pnpm install
pnpm dev