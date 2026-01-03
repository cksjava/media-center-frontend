# 🎵 Nostalgia Media Center - Frontend

<!--
📸 Screenshot
Replace the image below with an actual screenshot once ready.
-->
<p align="center">
  <img src="./docs/screenshot.png" alt="Nostalgia Music Player UI" width="900" />
</p>

A modern, lightweight music player frontend built with **React, TypeScript, and Tailwind CSS**, designed to work with the Nostalgia backend media library.

The focus of this frontend is **clarity, speed, and a clean listening experience** for locally scanned music collections.

---

## ✨ Features

### 🎼 Library
- **Albums view** with cover art
- Rich album detail pages with track listings
- Consistent cover sizing and clean typography
- Supports albums with mixed artists (soundtracks, compilations)

### ❤️ Favourites
- Mark tracks as favourites
- Quickly access your most-loved songs

### 📂 Playlists
- Create and manage playlists
- Add tracks from albums or favourites
- Playlist order is preserved

### 🔍 Scanning & Library Management
- Trigger directory scans from the UI
- Reflects backend scan results in real time
- Handles incremental scans safely

### 🎧 Playback
- Queue-based playback
- Album play & shuffle
- Track-level play
- Persistent now-playing bar

### 🎵 Format Support
- **MP3**
- **FLAC**
- **M4A / AAC**
- Other formats supported by the backend scanner

---

## 🧱 Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS** (utility-first styling)
- **Font Awesome** (icons)
- **React Router**
- Backend-driven architecture (no local media parsing in frontend)

---

## 🗂 Project Structure (simplified)

```

src/
├── api/            # API clients (albums, tracks, playlists, scan)
├── components/     # Reusable UI components
│   ├── common/
│   ├── layout/
│   └── player/
├── context/        # Global state (player, queue, etc.)
├── pages/          # Route-level pages
├── types/          # Shared models
└── utils/

````

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Running **Nostalgia backend** (API + covers endpoint)

### Install dependencies
```bash
npm install
````

### Run development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🔗 Backend Dependency

This frontend **requires the Nostalgia backend** for:

* Album & track metadata
* Cover art (`/covers/*`)
* Playback control
* Directory scanning
* Playlists and favourites

Make sure the backend API base URL is configured correctly in your environment.

---

## 🎯 Design Philosophy

* **UI should never guess metadata**
* Backend is the source of truth
* Fast navigation, minimal distractions
* Works equally well for:

  * Bollywood soundtracks
  * Large classical collections
  * Western albums with strict metadata

---

## 🛠 Future Improvements (Planned)

* Album artist & year in album grid
* Disc grouping for multi-disc albums
* Drag-and-drop playlist ordering
* Keyboard shortcuts
* Mini player mode

---

## 📄 License

MIT (or update as appropriate)

---

If you want, next we can:

* polish the **Favourites page UI**
* design a **Playlist detail page**
* or document the **API contract** cleanly for the backend/frontend boundary
