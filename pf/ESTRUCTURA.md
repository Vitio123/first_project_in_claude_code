# Estructura del proyecto

Este es un **portfolio fullstack**: una web (frontend) que habla con un servidor propio (backend) que guarda los datos en una base de datos SQLite.

## Visión general

```
pf/
├── client/          ← Frontend (lo que ve el usuario en el navegador)
├── server/          ← Backend (la API y la base de datos)
├── package.json     ← Script raíz que arranca client y server a la vez
└── node_modules/    ← Dependencias (no tocar, se generan con npm install)
```

## Cómo arrancarlo

Desde la carpeta `pf/`:

```bash
npm run install:all   # solo la primera vez
npm start             # levanta cliente y servidor a la vez
```

- Cliente (Vite) → http://localhost:5173 (o el puerto que indique la consola)
- Servidor (Express) → http://localhost:3000

## `client/` — el frontend (React + Vite)

```
client/
├── index.html         ← HTML base que carga la app
├── vite.config.js     ← Configuración del bundler
├── package.json       ← Dependencias del frontend (react, react-router-dom)
└── src/
    ├── main.jsx       ← Punto de entrada: monta React en el HTML
    ├── App.jsx        ← Define las rutas (qué página se muestra en cada URL)
    ├── index.css      ← Estilos globales: variables de color, botones, animaciones
    │
    ├── pages/         ← Una página por archivo
    │   ├── Home.jsx           → "/"
    │   ├── Projects.jsx       → "/projects"
    │   ├── ProjectDetail.jsx  → "/projects/:id"
    │   ├── Contact.jsx        → "/contact"
    │   └── NotFound.jsx       → cualquier ruta no encontrada
    │
    ├── components/    ← Piezas reutilizables
    │   ├── Navbar.jsx       (barra superior + botón de tema claro/oscuro)
    │   └── ProjectCard.jsx  (tarjeta de cada proyecto)
    │
    ├── hooks/         ← Lógica reutilizable (hooks de React)
    │   ├── useFetch.js          (pedir datos a la API)
    │   ├── useTheme.js          (cambiar entre modo claro y oscuro)
    │   └── useScrollReveal.js   (animar elementos al hacer scroll)
    │
    └── services/
        └── api.js     ← Funciones que llaman al backend (fetch a /api/...)
```

## `server/` — el backend (Express + SQLite)

```
server/
├── index.js          ← Punto de entrada: arranca Express, define las rutas (/api/...)
├── database.js       ← Conecta y prepara la base de datos
├── portfolio.db      ← Archivo de la base de datos SQLite (datos reales)
└── package.json      ← Dependencias (express, cors, sql.js)
```

## Cómo viajan los datos

```
Usuario → Página React (pages/)
       → services/api.js  (hace fetch)
       → server/index.js  (Express recibe la petición)
       → server/database.js  (consulta SQLite)
       → vuelta con la respuesta JSON
       → React renderiza el resultado
```

## Detalles útiles

- **Estilos**: todo en `client/src/index.css`. No hay Tailwind ni librerías de UI; son clases propias (`.btn-apple`, `.reveal`, etc.).
- **Animaciones de scroll**: los elementos con clase `.reveal` empiezan invisibles y aparecen al entrar en pantalla. Lo gestiona `useScrollReveal.js`, que ahora tiene un fallback de seguridad para que ningún elemento se quede invisible aunque algo falle.
- **Tema claro/oscuro**: lo controla `useTheme.js`, y el botón vive en `Navbar.jsx`.
- **Base de datos**: el archivo `portfolio.db` está en el repo. Si lo borras, pierdes los datos.
