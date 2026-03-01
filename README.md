# SU Rudmanns Website

Offizielle Website von Sportunion Rudmanns - Stift Zwettl

## 🚀 Quick Start

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Strapi)
```bash
cd backend
npm install
npm run develop
```

## 📁 Struktur

```
SURudmannsWebsite/
├── frontend/          # Next.js 14 App
│   ├── src/
│   │   ├── app/       # Pages (App Router)
│   │   ├── components/
│   │   ├── lib/       # API calls
│   │   └── styles/
│   └── tailwind.config.js
│
├── backend/           # Strapi CMS
│   └── src/
│       └── api/       # Content Types
│
└── docs/              # Dokumentation
```

## 🎨 Design

- **Primärfarbe:** #da8d43 (Orange)
- **Sekundärfarbe:** #1a1a18 (Schwarz)
- **Akzentfarbe:** #ffffff (Weiß)

## 📝 Content Types (Strapi)

- **Player** - Spieler (Name, Nummer, Position, Geburtsdatum, Foto)
- **Game** - Spiele (Datum, Uhrzeit, Gegner, Ergebnis, Liga)
- **News** - Nachrichten (Titel, Inhalt, Datum, Bild)
- **Event** - Veranstaltungen (Titel, Datum, Beschreibung, Ort)
- **Sponsor** - Sponsoren (Name, Logo, Kategorie)
- **TeamMember** - Vorstand/Trainer (Name, Funktion, Foto, Kontakt)

## 🌍 Deployment

- **Frontend:** IONOS Webspace (`/sur/` Ordner)
- **Backend:** Render.com (kostenlos)

Siehe `docs/DEPLOYMENT.md` für Details.

## 📅 Zeitplan

- **Projektstart:** 01.03.2026
- **Launch:** 01.04.2026

---

*Made with ❤️ for SU Rudmanns*
