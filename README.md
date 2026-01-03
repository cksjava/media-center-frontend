# Media Center – Frontend

<p align="center">
  <img src="./docs/screenshot.png" alt="Nostalgia Music Player UI" width="900" />
</p>

Nostalgia Frontend is a modern music player interface built with React, TypeScript, and Tailwind CSS.
It is designed to work closely with the Nostalgia backend media server to provide a clean, fast, and distraction-free experience for browsing and playing locally stored music.

---

## Features

### Library

* Albums view with cover art
* Album detail pages with track listings
* Consistent cover sizing and aligned layouts
* Supports albums with mixed artists such as soundtracks and compilations

### Favourites

* Mark tracks as favourites
* Dedicated favourites view for quick access

### Playlists

* Create and manage playlists
* Add tracks from albums or favourites
* Preserves playlist order

### Scanning and Library Management

* Trigger directory scans from the UI
* Reflects backend scan results
* Safe incremental scanning

### Playback

* Queue-based playback
* Album play and shuffle
* Track-level play
* Persistent now-playing bar

### Format Support

* MP3
* FLAC
* M4A / AAC
* Other formats supported by the backend scanner

---

## Technology Stack

* React
* TypeScript
* Tailwind CSS
* Font Awesome
* React Router

---

## Project Structure (simplified)

src/

* api/            API clients (albums, tracks, playlists, scan)
* components/     Reusable UI components

  * common/
  * layout/
  * player/
* context/        Global state (player, queue, etc.)
* pages/          Route-level pages
* types/          Shared models
* utils/

---

## Getting Started

### Prerequisites

* Node.js 18 or later
* Nostalgia backend running

### Install dependencies

npm install

### Run development server

npm run dev

The application will be available at:

[http://localhost:5173](http://localhost:5173)

---

## Backend Dependency

This frontend requires the Nostalgia backend for all data and playback operations.

Backend repository:
[https://github.com/cksjava/media-center-backend.git](https://github.com/cksjava/media-center-backend.git)

The backend provides:

* Album and track metadata
* Cover art via the `/covers` endpoint
* Playback and queue control
* Directory scanning
* Playlists and favourites

---

## Design Philosophy

* Backend is the single source of truth
* Frontend never parses audio files or metadata
* Focus on clarity, consistency, and responsiveness
* Designed to work equally well for large and diverse music collections

---

## License

MIT
