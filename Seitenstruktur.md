# Zusätzliche Design-Anforderungen - SURudmanns-Website

**Datum:** 02.03.2026  
**Quelle:** Florian (direkte Anforderung)

---

## 1. Globale Struktur (alle Seiten)

### Header (fixiert oben)
- **Farbe:** Orange (Vereinsfarbe)
- **Elemente:**
  - Logo
  - Navigation-Menü: **Home | Mannschaft | Spielplan | Pfingsturnier | Events | News | Fanshop**

### Content-Bereich
- Individuell pro Seite (siehe unten)

### Sponsoren-Section (alle Seiten direkt über Footer)
- **Position:** Unter dem Content auf jeder Seite
- **Inhalt:** Alle Sponsoren-Logos (ALLE Logos gleich groß)
- **Darstellung:** Permanent Durchlaufendes Karusell

### Footer (alle Seiten)
- **Elemente:**
  - Link zu Impressum
  - Social Media Links: **Instagram, Facebook**
  - **Karten-Integration:** Google Maps/OpenStreetMap zum Fußballplatz Rudmanns Stift Zwettl)

---

## 2. Seiten-spezifische Anforderungen

### Home (Startseite)

**Aufbau von oben nach unten:**
1. **Slider** - Großes Bild/Karussell (hero section)
2. **Content/Text** - Willkommenstext, aktuelle News
3. **Sponsoren-Section**
4. **Footer**

---

### Team

**Aufbau von oben nach unten:**
1. **Slider** - Großes Bild (Mannschaftsfoto)
2. **Content:**
   - **Spieler-Liste:**
     - Bild (aus data/player_images/)
     - Voller Name
     - Geburtsdatum
   - Grid-Layout oder Listen-Layout
3. **Sponsoren-Section**
4. **Footer**

---

### News

**Aufbau von oben nach unten:**
1. **Blog-Übersicht:**
   - Liste aller News-Artikel
   - Titel, Vorschautext, Datum, Bild
   - Link zur **Detailseite**
2. **Sponsoren-Section**
3. **Footer**

**News-Detailseite:**
- Vollständiger Artikel
- **Social Share Button** (Teilen-Funktion)
- Zurück-Link zur Blog-Übersicht

**Technisch:**
- Social Share: Facebook, Twitter/X, WhatsApp

---

### Pfingsturnier

**Aufbau von oben nach unten:**
1. **Countdown** - Großer Timer bis Pfingstsonntag (jährlich aktualisieren)
2. **Turnier-Info** - Kurzer Text mit Informationen zum Turnier
3. **Kontaktformular:**
   - Pflichtfelder:
     - Teamname
     - Nachricht/Text
     - E-Mail
   - Optional:
     - Telefonnummer
   - Absenden-Button → Anmeldung
4. **Sponsoren-Section**
5. **Footer**

**Technisch:**
- Countdown: JavaScript (targetDate = Pfingstsonntag aktuelles Jahr)
- Formular: HTML-Formular (E-Mail-Versand via backend oder Formspree)

---

### Events

**Aufbau von oben nach unten:**
1. **Event-Liste:**
   - Datum, Titel, Beschreibung
   - Veranstaltungskalender
2. **Sponsoren-Section**
3. **Footer**

---

### Fanshop

**Aufbau von oben nach unten:**
1. **Shop-Übersicht:**
   - iFrame Integration eines bestehenden Shops
2. **Sponsoren-Section**
3. **Footer**

**Technisch:**

---

## 3. Technische Implementierungsdetails

### Farbschema (Vereinsfarben)
```css
--primary: #FF6600;    /* Orange - Header */
--secondary: #000000;  /* Schwarz */
--accent: #FFFFFF;     /* Weiß */
--background: #FFFFFF; /* Weiß für Content */
```

### Navigation
- **Desktop:** Horizontales Menü
- **Mobile:** Hamburger-Menü
- **Aktive Seite:** Visuell hervorgehoben

### Slider (Home & Team)
- Auto-Play (optional)
- Manuelle Navigation (Pfeile/Punkte)
- Responsive (verschiedene Bildgrößen für Mobile/Desktop)

### Karten-Integration (Footer)
- **Ziel:** Fußballplatz Rudmanns / Stift Zwettl
- **Provider:** Google Maps oder OpenStreetMap (datenschutzfreundlicher)
- **Funktion:** Klick öffnet externe Karte (Google Maps App/Website)

### Social Share (News)
- **Plattformen:** Facebook, Instagram, WhatsApp, E-Mail
- **Funktion:** Aktuelle URL teilen

---
