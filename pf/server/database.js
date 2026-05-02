const initSqlJs = require("sql.js");
const path = require("path");
const fs = require("fs");

const DB_PATH = path.join(__dirname, "portfolio.db");

async function createDb() {
  const SQL = await initSqlJs();

  let db;
  if (fs.existsSync(DB_PATH)) {
    db = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    db = new SQL.Database();
  }

  function save() {
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      tech TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      topics TEXT NOT NULL DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  const stmt = db.prepare("SELECT COUNT(*) as n FROM projects");
  stmt.step();
  const count = stmt.getAsObject().n;
  stmt.free();

  if (count === 0) {
    const ins = db.prepare(
      "INSERT INTO projects (title, description, tech, content, topics) VALUES (?,?,?,?,?)"
    );

    ins.run([
      "HTML — Estructura de la web",
      "Fundamentos de HTML5: etiquetas semánticas, formularios, accesibilidad y buenas prácticas.",
      "HTML5, Semántica, Accesibilidad",
      `## ¿Qué es HTML?

HTML (HyperText Markup Language) es el lenguaje que define la **estructura** de toda página web. No es un lenguaje de programación — es un lenguaje de marcado.

### Etiquetas semánticas

\`\`\`html
<header>  → Encabezado de la página o sección
<nav>     → Navegación principal
<main>    → Contenido principal (solo uno por página)
<section> → Agrupación temática de contenido
<article> → Contenido independiente (post, noticia)
<aside>   → Contenido relacionado (sidebar)
<footer>  → Pie de página
\`\`\`

### Formularios

\`\`\`html
<form action="/api/contact" method="POST">
  <label for="name">Nombre</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <textarea name="message" rows="5"></textarea>
  <button type="submit">Enviar</button>
</form>
\`\`\`

### Buenas prácticas

- Siempre usa \`alt\` en imágenes para accesibilidad
- Un solo \`<h1>\` por página
- Usa \`<button>\` para acciones, \`<a>\` para navegación
- Valida tu HTML en validator.w3.org`,
      "Etiquetas semánticas,Formularios HTML,Accesibilidad,Estructura de documento"
    ]);

    ins.run([
      "CSS — Grid, Flexbox y diseño responsivo",
      "Estilos modernos con CSS Grid y Flexbox. Diseño responsivo sin frameworks.",
      "CSS3, Grid, Flexbox, Responsive, Variables CSS",
      `## Flexbox vs Grid

**Flexbox** → una dimensión (fila O columna)
**Grid** → dos dimensiones (filas Y columnas)

### Flexbox — ejemplo práctico

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;  /* distribuye horizontalmente */
  align-items: center;             /* centra verticalmente */
  gap: 16px;                       /* espacio entre items */
}
\`\`\`

### CSS Grid — layout de página

\`\`\`css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;      /* sidebar + contenido */
  grid-template-rows: 60px 1fr 80px;     /* nav + main + footer */
  min-height: 100vh;
}

/* Responsivo: en móvil todo en una columna */
@media (max-width: 768px) {
  .page {
    grid-template-columns: 1fr;
  }
}
\`\`\`

### Variables CSS

\`\`\`css
:root {
  --color-primary: #0071e3;
  --color-text: #1d1d1f;
  --radius: 12px;
}

.button {
  background: var(--color-primary);
  border-radius: var(--radius);
  color: white;
}
\`\`\`

### Media queries — diseño responsivo

\`\`\`css
/* Móvil primero */
.card { padding: 16px; }

/* Tablet */
@media (min-width: 768px) {
  .card { padding: 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .card { padding: 32px; }
}
\`\`\``,
      "Flexbox,CSS Grid,Variables CSS,Media queries,Diseño responsivo"
    ]);

    ins.run([
      "JavaScript — Estructuras de datos y lógica",
      "JavaScript moderno: arrays, objetos, Map, Set, async/await y manipulación del DOM.",
      "JavaScript, ES6+, Estructuras de datos, Async",
      `## Estructuras de datos en JavaScript

### Arrays — colecciones ordenadas

\`\`\`javascript
const frutas = ["manzana", "banana", "cereza"];

// Métodos esenciales
frutas.push("durazno");           // agregar al final
frutas.filter(f => f.length > 5); // filtrar
frutas.map(f => f.toUpperCase()); // transformar
frutas.find(f => f === "banana"); // buscar uno
frutas.some(f => f === "cereza"); // ¿existe alguno?
\`\`\`

### Objetos — pares clave-valor

\`\`\`javascript
const usuario = {
  nombre: "Juan",
  edad: 25,
  skills: ["React", "Node"],
};

// Destructuring
const { nombre, skills } = usuario;

// Spread — copiar y extender
const actualizado = { ...usuario, edad: 26 };
\`\`\`

### Map y Set

\`\`\`javascript
// Map — objeto con cualquier tipo de clave
const cache = new Map();
cache.set("user:1", { nombre: "Ana" });
cache.get("user:1"); // { nombre: "Ana" }

// Set — valores únicos
const tags = new Set(["react", "node", "react"]);
// Set { "react", "node" } — sin duplicados
\`\`\`

### Async/Await

\`\`\`javascript
async function obtenerProyectos() {
  try {
    const res = await fetch("/api/projects");
    if (!res.ok) throw new Error("Error " + res.status);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fallo:", error.message);
  }
}
\`\`\``,
      "Arrays y métodos,Objetos y destructuring,Map y Set,Async/Await,Fetch API"
    ]);

    ins.run([
      "React — Componentes, hooks y rutas",
      "Interfaces reactivas con componentes funcionales, useState, useEffect y React Router.",
      "React, JSX, Hooks, React Router, Vite",
      `## React — conceptos clave

### Componentes funcionales

\`\`\`jsx
function Saludo({ nombre }) {
  return <h1>Hola, {nombre}</h1>;
}

// Uso: <Saludo nombre="Juan" />
\`\`\`

### useState — estado local

\`\`\`jsx
import { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}
\`\`\`

### useEffect — efectos secundarios

\`\`\`jsx
import { useState, useEffect } from "react";

function Proyectos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(setData);
  }, []); // [] = solo al montar

  return data.map(p => <p key={p.id}>{p.title}</p>);
}
\`\`\`

### Custom hooks — lógica reutilizable

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}

// Uso: const { data, loading } = useFetch("/api/projects");
\`\`\`

### React Router — navegación SPA

\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/projects">Proyectos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\``,
      "Componentes funcionales,useState y useEffect,Custom hooks,React Router,JSX y props"
    ]);

    ins.run([
      "Node.js & Express — API REST",
      "Servidor backend con Express: rutas, middlewares, validación y estructura de API REST.",
      "Node.js, Express, API REST, Middlewares",
      `## Node.js + Express — backend desde cero

### Servidor básico

\`\`\`javascript
const express = require("express");
const app = express();

app.use(express.json()); // parsear JSON del body

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3001, () => console.log("Servidor en :3001"));
\`\`\`

### Rutas CRUD

\`\`\`javascript
// GET    /api/projects      → listar todos
// GET    /api/projects/:id  → obtener uno
// POST   /api/projects      → crear
// PUT    /api/projects/:id  → actualizar
// DELETE /api/projects/:id  → eliminar

app.post("/api/projects", (req, res) => {
  const { title, description } = req.body;

  // Validación en el servidor — NUNCA confiar solo en el frontend
  if (!title || !description) {
    return res.status(400).json({ error: "Campos requeridos" });
  }

  // ... insertar en la base de datos
  res.status(201).json({ id: result.lastInsertRowid, title });
});
\`\`\`

### Middlewares

\`\`\`javascript
// CORS — permitir peticiones desde otro dominio
const cors = require("cors");
app.use(cors());

// Middleware personalizado — logging
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); // IMPORTANTE: sin next() la petición se queda colgada
});
\`\`\`

### Manejo de errores

\`\`\`javascript
// Middleware de error (siempre al final)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});
\`\`\``,
      "Express setup,Rutas CRUD,Middlewares,Validación de datos,Manejo de errores"
    ]);

    ins.run([
      "Base de datos & API — Conexión y seguridad",
      "SQLite con sql.js, relaciones entre tablas, y seguridad: CORS, validación, sanitización.",
      "SQLite, SQL, Seguridad, CORS, Validación",
      `## Base de datos — SQLite

### Crear tablas

\`\`\`sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
\`\`\`

### Consultas básicas

\`\`\`sql
-- Insertar
INSERT INTO projects (title, description, tech)
VALUES ('Mi App', 'Una app genial', 'React, Node');

-- Leer todos
SELECT * FROM projects ORDER BY created_at DESC;

-- Leer uno
SELECT * FROM projects WHERE id = 1;

-- Actualizar
UPDATE projects SET title = 'Nuevo nombre' WHERE id = 1;

-- Eliminar
DELETE FROM projects WHERE id = 1;
\`\`\`

## Seguridad — lo que DEBES saber

### 1. NUNCA confiar en el input del usuario

\`\`\`javascript
// ❌ MAL — inyección SQL
db.run("SELECT * FROM users WHERE name = '" + userInput + "'");

// ✅ BIEN — consultas parametrizadas
db.run("SELECT * FROM users WHERE name = ?", [userInput]);
\`\`\`

### 2. CORS — controlar quién accede a tu API

\`\`\`javascript
const cors = require("cors");

// En desarrollo: permitir todo
app.use(cors());

// En producción: solo tu dominio
app.use(cors({ origin: "https://tudominio.com" }));
\`\`\`

### 3. Validación en el servidor

\`\`\`javascript
app.post("/api/contact", (req, res) => {
  const { email } = req.body;

  // Validar formato
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  // Limitar longitud para evitar abuso
  if (req.body.message.length > 5000) {
    return res.status(400).json({ error: "Mensaje muy largo" });
  }
});
\`\`\`

### 4. Variables de entorno

\`\`\`javascript
// Nunca hardcodear secretos en el código
// Usa un archivo .env (NO lo subas a git)
const SECRET = process.env.JWT_SECRET;
\`\`\``,
      "SQL básico,Consultas parametrizadas,CORS,Validación server-side,Variables de entorno"
    ]);

    ins.free();
    save();
  }

  return {
    all(sql, params = []) {
      const results = [];
      const s = db.prepare(sql);
      s.bind(params);
      while (s.step()) results.push(s.getAsObject());
      s.free();
      return results;
    },
    get(sql, params = []) {
      return this.all(sql, params)[0] ?? null;
    },
    run(sql, params = []) {
      db.run(sql, params);
      const id = db.exec("SELECT last_insert_rowid()")[0]?.values[0][0];
      save();
      return { lastInsertRowid: id, changes: db.getRowsModified() };
    },
  };
}

module.exports = createDb;
