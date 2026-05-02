# CLAUDE.md

Guía rápida para Claude Code en este repo.

## Qué es

Portfolio fullstack. Frontend React + Vite en `client/`, backend Express + SQLite (sql.js) en `server/`. El root usa `concurrently` para arrancar ambos.

## Comandos

Desde la raíz:

- `npm run install:all` — instala deps en root, client y server.
- `npm start` (alias `npm run dev`) — levanta server y client en paralelo.
- `npm run build --prefix client` — build de producción del frontend (Vite).
- `npm run preview --prefix client` — sirve el build local.
- `npm start --prefix server` — solo el backend (sin watch).

No hay tests ni linter configurados.

## Arquitectura

- **Cliente** ([client/src/main.jsx](client/src/main.jsx) → [client/src/App.jsx](client/src/App.jsx))
  - `pages/` — Home, Projects, ProjectDetail, Contact, NotFound. Rutas en `App.jsx` con React Router.
  - `components/` — `Navbar.jsx` (incluye toggle de tema), `ProjectCard.jsx`.
  - `hooks/` — `useFetch`, `useTheme` (dark/light), `useScrollReveal` (anima al hacer scroll vía IntersectionObserver; tiene fallback de 600ms y respeta `prefers-reduced-motion`).
  - `services/api.js` — cliente HTTP del backend.
  - `index.css` — CSS plano con variables (`--apple-*`, etc.) y clases de animación (`.reveal`, `.reveal-scale`, `.btn-apple*`).

- **Servidor** ([server/index.js](server/index.js))
  - Express con CORS. Rutas REST sobre `portfolio.db` (SQLite vía `sql.js`).
  - `database.js` — inicializa la DB.

## Convenciones

- CSS plano, sin Tailwind ni CSS-in-JS. Estilos globales en `client/src/index.css`.
- Componentes funcionales con hooks. Sin TypeScript.
- Comentarios y copies en español.
- Botones con clase `.btn-apple` + variante (`-primary`, `-ghost`, `-dark`).
- Si añades animaciones de entrada con `.reveal*`, asegúrate de que el contenedor padre use `useScrollReveal()` para que el observer las encuentre.

## Notas

- La DB SQLite (`server/portfolio.db`) está en el repo; no la borres.
- No subas `node_modules` ni `package-lock.json` con cambios accidentales.
