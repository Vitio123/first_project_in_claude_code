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

    // ─────────────────────────────────────────────────
    // 01 — HTML
    // ─────────────────────────────────────────────────
    ins.run([
      "HTML — Estructura de la web",
      "Fundamentos de HTML5: etiquetas semánticas, formularios, accesibilidad y buenas prácticas.",
      "HTML5, Semántica, Accesibilidad",
      `## ¿Qué es HTML?

HTML (HyperText Markup Language) es el lenguaje que define la **estructura** de toda página web. No es un lenguaje de programación — es un lenguaje de marcado: indica al navegador *qué* es cada cosa, no *cómo* se ve.

Una página web sin HTML no existe. Sin CSS se ve fea. Sin JavaScript no reacciona. Pero el HTML es el esqueleto.

## Anatomía de un documento

Todo archivo \`.html\` empieza igual:

\`\`\`html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi sitio</title>
  </head>
  <body>
    <!-- el contenido visible va aquí -->
  </body>
</html>
\`\`\`

- \`<!DOCTYPE html>\` le dice al navegador que es HTML5.
- \`lang="es"\` ayuda a lectores de pantalla y traductores.
- \`viewport\` es **obligatorio** para que se vea bien en móvil.
- \`charset="UTF-8"\` permite acentos y emojis sin caracteres raros.

## Etiquetas semánticas

La web vieja usaba \`<div>\` para todo. HTML5 trajo etiquetas con **significado**:

\`\`\`html
<header>  <!-- encabezado de la página o sección -->
<nav>     <!-- navegación principal -->
<main>    <!-- contenido principal (uno solo por página) -->
<section> <!-- agrupación temática de contenido -->
<article> <!-- contenido independiente: post, noticia, card -->
<aside>   <!-- contenido relacionado: sidebar -->
<footer>  <!-- pie de página -->
\`\`\`

> Regla: si un \`<div>\` se puede reemplazar por una etiqueta semántica sin perder nada, hazlo. Mejora SEO, accesibilidad y legibilidad.

### Cuándo usar cada una

- \`<article>\` → algo que tendría sentido por sí solo (un post de blog).
- \`<section>\` → un bloque temático *dentro* de algo más grande (sección "Stack" de una página).
- \`<aside>\` → contenido tangencial (autor, tags, links relacionados).
- \`<div>\` → solo cuando ninguna otra encaja y necesitas un contenedor.

## Formularios

Los formularios son el principal canal de input del usuario. HTML5 trae validación gratis:

\`\`\`html
<form action="/api/contact" method="POST">
  <label for="name">Nombre</label>
  <input
    type="text"
    id="name"
    name="name"
    required
    minlength="2"
    maxlength="50"
  />

  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    placeholder="tu@email.com"
  />

  <label for="message">Mensaje</label>
  <textarea
    id="message"
    name="message"
    rows="5"
    required
  ></textarea>

  <button type="submit">Enviar</button>
</form>
\`\`\`

- \`type="email"\` valida formato automáticamente.
- \`required\` impide enviar si está vacío.
- \`for="name"\` en el label apunta al \`id="name"\` del input — clic en label enfoca el input.

### Tipos de input útiles

- \`text\`, \`email\`, \`password\`, \`tel\`, \`url\`, \`search\`
- \`number\`, \`range\` (slider), \`date\`, \`time\`, \`color\`
- \`file\` (subir archivos), \`checkbox\`, \`radio\`

## Accesibilidad — lo no negociable

La accesibilidad no es opcional. Una web inaccesible excluye gente.

1. **Texto alternativo en imágenes**: \`<img src="logo.png" alt="Logo de la empresa">\`. Si la imagen es decorativa, \`alt=""\` (vacío, no omitido).
2. **Un solo \`<h1>\`** por página. Los demás encabezados (\`h2\`, \`h3\`…) deben anidarse jerárquicamente.
3. **\`<button>\` para acciones**, \`<a>\` para navegación. Nunca un \`<div onClick>\`.
4. **Contraste de color** mínimo 4.5:1 entre texto y fondo (verifícalo en webaim.org/resources/contrastchecker).
5. **Foco visible**: nunca uses \`outline: none\` sin reemplazo. Quien navega con teclado depende de eso.

## Validación

Antes de subir un sitio, valídalo en [validator.w3.org](https://validator.w3.org). Los errores de HTML rara vez rompen la página — pero corromen el SEO, accesibilidad y consistencia entre navegadores.

> "Funciona en mi Chrome" no significa que funciona.`,
      "Etiquetas semánticas,Formularios HTML,Accesibilidad,Estructura de documento,Inputs HTML5,Validación W3C"
    ]);

    // ─────────────────────────────────────────────────
    // 02 — CSS
    // ─────────────────────────────────────────────────
    ins.run([
      "CSS — Grid, Flexbox y diseño responsivo",
      "Estilos modernos con CSS Grid y Flexbox. Diseño responsivo sin frameworks, variables CSS y buenas prácticas.",
      "CSS3, Grid, Flexbox, Responsive, Variables CSS",
      `## CSS — el qué, el cómo

HTML define qué hay. CSS define cómo se ve. La separación es tan importante que cambiar el CSS de un sitio puede transformarlo sin tocar una línea de HTML.

## El modelo de caja

Todo elemento HTML es una caja con cuatro capas:

\`\`\`css
.box {
  margin: 16px;     /* espacio EXTERIOR */
  border: 1px solid;/* el borde */
  padding: 12px;    /* espacio INTERIOR */
  /* contenido */
}
\`\`\`

Por defecto, \`width\` solo cuenta el contenido — sumas padding y border manualmente. La regla más útil del CSS moderno:

\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

> Con \`border-box\`, \`width\` incluye padding y border. Mucho más predecible.

## Flexbox — una dimensión

Flexbox alinea elementos en **una sola dirección** (fila o columna). Perfecto para navbars, listas de cards, centrar cosas.

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between; /* eje principal */
  align-items: center;            /* eje cruzado */
  gap: 16px;                      /* espacio entre items */
}

/* Centrar perfecto vertical y horizontal */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

Propiedades clave en items hijos:

- \`flex: 1\` → el item crece para llenar espacio disponible
- \`flex-shrink: 0\` → impide que se encoja
- \`order: -1\` → cambia el orden visual sin tocar HTML

## CSS Grid — dos dimensiones

Grid es el sistema más poderoso para layouts completos:

\`\`\`css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;       /* sidebar + contenido */
  grid-template-rows: auto 1fr auto;      /* nav + main + footer */
  min-height: 100vh;
}

.sidebar { grid-row: 2; }
.main    { grid-row: 2; grid-column: 2; }
\`\`\`

\`fr\` = "fracción del espacio disponible". Más flexible que porcentajes.

### Grid responsivo automático

\`\`\`css
.cards {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(280px, 1fr)
  );
  gap: 16px;
}
\`\`\`

Esto crea tantas columnas como quepan, cada una mínimo 280px. **Cero media queries necesarias**.

## Variables CSS (custom properties)

Las variables permiten cambiar todo el tema desde un solo lugar:

\`\`\`css
:root {
  --color-bg: #0a1424;
  --color-text: #f0e6d2;
  --color-accent: #38bdf8;
  --space-sm: 8px;
  --space-md: 16px;
  --radius: 8px;
}

.button {
  background: var(--color-accent);
  color: var(--color-bg);
  padding: var(--space-md);
  border-radius: var(--radius);
}

/* Cambiar tema cambiando una variable */
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #0a1424;
}
\`\`\`

## Diseño responsivo

**Mobile first**: estilos base para móvil, media queries para pantallas más grandes.

\`\`\`css
/* base: móvil */
.container {
  padding: 16px;
  font-size: 16px;
}

/* tablet (≥768px) */
@media (min-width: 768px) {
  .container {
    padding: 32px;
    font-size: 17px;
  }
}

/* desktop (≥1024px) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
\`\`\`

### Unidades responsivas

- \`rem\` → relativo al tamaño raíz (\`html { font-size: 16px }\` por defecto). Úsalo para *todo* tipográfico.
- \`em\` → relativo al elemento padre. Útil dentro de componentes.
- \`%\` → porcentaje del padre.
- \`vw\`, \`vh\` → 1% del viewport.
- \`clamp(min, ideal, max)\` → tamaño fluido con límites.

\`\`\`css
h1 {
  /* mínimo 2rem, ideal 5vw, máximo 4rem */
  font-size: clamp(2rem, 5vw, 4rem);
}
\`\`\`

## Posicionamiento

\`\`\`css
position: static;   /* default, fluye normal */
position: relative; /* base de referencia para hijos absolute */
position: absolute; /* sale del flujo, anclado al padre relative */
position: fixed;    /* anclado al viewport, ignora scroll */
position: sticky;   /* fluye normal hasta cierto punto, luego se pega */
\`\`\`

\`sticky\` es la joya menos usada — perfecto para sidebars, headers de tabla:

\`\`\`css
.sidebar {
  position: sticky;
  top: 24px;
  align-self: start; /* importante en grid */
}
\`\`\`

## Buenas prácticas

- Una clase por concepto, no por estilo (\`.card\` mejor que \`.padding-16-blue\`).
- Evita IDs como selectores (especificidad alta = difícil de sobreescribir).
- Mobile first siempre.
- No abuses de \`!important\` — es señal de que algo está mal arquitectado.
- Usa el inspector del navegador como tu mejor amigo.`,
      "Modelo de caja,Flexbox,CSS Grid,Variables CSS,Media queries,Diseño responsivo,Position sticky,clamp()"
    ]);

    // ─────────────────────────────────────────────────
    // 03 — JavaScript
    // ─────────────────────────────────────────────────
    ins.run([
      "JavaScript — Estructuras de datos y lógica",
      "JavaScript moderno: arrays, objetos, Map, Set, async/await, manipulación del DOM y patrones idiomáticos.",
      "JavaScript, ES6+, Estructuras de datos, Async, DOM",
      `## JavaScript hoy

JavaScript empezó como un lenguaje para validar formularios. Hoy corre servidores, móviles, IoT y tu navegador. Todo lo que ves moverse en una web pasa por JS.

## Variables y tipos

\`\`\`javascript
// const → valor inmutable (la referencia, no el contenido)
const PI = 3.14159;
const lista = [1, 2, 3];
lista.push(4); // ✅ permitido — modificas el array, no la referencia
// lista = [];  // ❌ error — reasignación bloqueada

// let → valor mutable, scope de bloque
let contador = 0;
contador++;

// var → NUNCA lo uses. Scope confuso, hoisting raro, herencia mala.
\`\`\`

> Regla: usa \`const\` por defecto. Cambia a \`let\` solo cuando necesites reasignar.

## Arrays — la colección base

\`\`\`javascript
const frutas = ["manzana", "banana", "cereza"];

// Inmutables (devuelven nuevo array)
frutas.map(f => f.toUpperCase());     // ["MANZANA", "BANANA", ...]
frutas.filter(f => f.length > 5);     // ["manzana", "banana", "cereza"]
frutas.find(f => f === "banana");     // "banana"
frutas.some(f => f.startsWith("c"));  // true
frutas.every(f => f.length > 3);      // true
frutas.reduce((acc, f) => acc + f.length, 0); // 19

// Mutables (modifican el array original)
frutas.push("durazno");   // agrega al final
frutas.pop();             // quita del final
frutas.shift();           // quita del inicio
frutas.unshift("kiwi");   // agrega al inicio

// Spread y destructuring
const [primera, ...resto] = frutas;
const copia = [...frutas, "uva"];
\`\`\`

## Objetos — pares clave-valor

\`\`\`javascript
const usuario = {
  nombre: "Juan",
  edad: 25,
  skills: ["React", "Node"],
  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  },
};

// Destructuring con renombre y defaults
const { nombre, edad: years, rol = "user" } = usuario;

// Spread para copiar y extender
const actualizado = { ...usuario, edad: 26, activo: true };

// Object.keys, .values, .entries
Object.keys(usuario);    // ["nombre", "edad", "skills", "saludar"]
Object.values(usuario);  // ["Juan", 25, [...], fn]
Object.entries(usuario); // [["nombre", "Juan"], ...]
\`\`\`

## Map y Set

\`\`\`javascript
// Map → objeto con cualquier tipo de clave (no solo strings)
const cache = new Map();
cache.set("user:1", { nombre: "Ana" });
cache.has("user:1");  // true
cache.get("user:1");  // { nombre: "Ana" }
cache.delete("user:1");
cache.size;           // número de entradas

// Set → colección de valores únicos
const tags = new Set(["react", "node", "react", "ts"]);
// Set { "react", "node", "ts" } — duplicados ignorados
tags.add("vite");
tags.has("react"); // true

// Truco: deduplicar un array
const unicos = [...new Set([1, 2, 2, 3, 3, 3])]; // [1, 2, 3]
\`\`\`

## Funciones

\`\`\`javascript
// Declaración tradicional
function suma(a, b) {
  return a + b;
}

// Arrow function — sin "this" propio
const suma = (a, b) => a + b;

// Parámetros default y rest
function saludar(nombre = "anónimo", ...invitados) {
  console.log(\`\${nombre} trae a \${invitados.length} amigos\`);
}

// Funciones de orden superior — funciones que reciben/devuelven funciones
const multiplicador = (n) => (x) => x * n;
const triple = multiplicador(3);
triple(10); // 30
\`\`\`

## Async — el mundo no espera

JavaScript es **single-threaded**: solo hace una cosa a la vez. Lo que cambia el juego es el **event loop**: las operaciones lentas (red, disco, timers) no bloquean.

### Promises

\`\`\`javascript
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

esperar(1000).then(() => console.log("Pasó un segundo"));

// Encadenar
fetch("/api/projects")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => console.log("Terminé"));
\`\`\`

### Async/Await

Mucho más legible que \`.then\`:

\`\`\`javascript
async function obtenerProyectos() {
  try {
    const res = await fetch("/api/projects");
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Falló:", error.message);
    return [];
  }
}

// Toda función async devuelve una Promise
const proyectos = await obtenerProyectos();
\`\`\`

### Promise.all — paralelo

\`\`\`javascript
// Lanza todas las requests al mismo tiempo
const [usuarios, posts, tags] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
  fetch("/api/tags").then(r => r.json()),
]);
\`\`\`

> Si todas son independientes, **\`Promise.all\` es siempre más rápido** que awaits secuenciales.

## DOM — manipular la página

\`\`\`javascript
// Seleccionar
const btn = document.querySelector(".btn-primary");
const items = document.querySelectorAll("li.item");

// Modificar
btn.textContent = "Click";
btn.classList.add("active");
btn.classList.toggle("hidden");
btn.dataset.userId = "42"; // <button data-user-id="42">

// Crear y agregar
const nuevo = document.createElement("div");
nuevo.className = "card";
nuevo.textContent = "Hola";
document.body.appendChild(nuevo);

// Eventos
btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
});
\`\`\`

## Patrones idiomáticos

\`\`\`javascript
// Optional chaining — no revienta si algo es null
const ciudad = usuario?.direccion?.ciudad ?? "desconocida";

// Nullish coalescing — solo cae si es null o undefined (a diferencia de ||)
const puerto = config.puerto ?? 3000;

// Template literals
const html = \`
  <div class="user">
    <h2>\${nombre}</h2>
    <p>\${edad} años</p>
  </div>
\`;
\`\`\``,
      "Variables y tipos,Arrays y métodos,Objetos y destructuring,Map y Set,Async/Await,Promises,DOM,Optional chaining"
    ]);

    // ─────────────────────────────────────────────────
    // 04 — React
    // ─────────────────────────────────────────────────
    ins.run([
      "React — Componentes, hooks y rutas",
      "Interfaces reactivas con componentes funcionales, hooks (useState, useEffect, custom), React Router y patrones modernos.",
      "React, JSX, Hooks, React Router, Vite",
      `## ¿Por qué React?

Antes de React, actualizar la UI era manual: cambias datos → buscas el elemento DOM → lo modificas. Para apps grandes esto se vuelve insostenible.

React invierte el modelo: tú describes **cómo se ve la UI según el estado**, y React se encarga de actualizar el DOM. Cambias el estado, la UI se redibuja sola.

## Componentes funcionales

\`\`\`jsx
function Saludo({ nombre, edad = 0 }) {
  return (
    <div className="card">
      <h1>Hola, {nombre}</h1>
      {edad > 0 && <p>Tienes {edad} años</p>}
    </div>
  );
}

// Uso
<Saludo nombre="Juan" edad={25} />
\`\`\`

> JSX **no es HTML**. Es JavaScript que se parece. Por eso es \`className\` en vez de \`class\` (porque \`class\` es palabra reservada en JS).

## useState — estado local

El estado es la memoria del componente. Cuando cambia, React re-renderiza.

\`\`\`jsx
import { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Clicks: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
\`\`\`

### Actualizar basándose en el valor anterior

\`\`\`jsx
// ❌ MAL si haces varios setCount seguidos
setCount(count + 1);
setCount(count + 1); // ambos ven el mismo "count"

// ✅ BIEN — la función recibe el valor más reciente
setCount(c => c + 1);
setCount(c => c + 1); // ahora sí cuenta dos veces
\`\`\`

## useEffect — efectos secundarios

Para cosas que **no son render**: fetch a una API, suscripciones, timers, manipulación del DOM.

\`\`\`jsx
import { useState, useEffect } from "react";

function Proyectos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;

    fetch("/api/projects")
      .then((r) => r.json())
      .then((json) => {
        if (!cancelado) setData(json);
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    // cleanup: corre al desmontar o antes del próximo efecto
    return () => {
      cancelado = true;
    };
  }, []); // [] = solo al montar

  if (loading) return <p>Cargando…</p>;
  return data.map((p) => <p key={p.id}>{p.title}</p>);
}
\`\`\`

### Las dependencias mandan

El array \`[]\` controla cuándo corre el efecto:

\`\`\`jsx
useEffect(() => { /* corre tras cada render */ });
useEffect(() => { /* solo al montar (y cleanup al desmontar) */ }, []);
useEffect(() => { /* corre cuando "id" cambia */ }, [id]);
\`\`\`

> Si declaras una variable dentro del componente y la usas en el efecto, **debe** ir en las deps. Olvidarla causa bugs sutiles donde el efecto ve valores viejos.

## Custom hooks — lógica reutilizable

Si dos componentes repiten la misma lógica con \`useState\` + \`useEffect\`, extráela a un hook custom. La regla: el nombre **debe** empezar con \`use\`.

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
        return r.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Uso en cualquier componente
function Lista() {
  const { data, loading, error } = useFetch("/api/projects");
  if (loading) return <p>Cargando…</p>;
  if (error) return <p>Error: {error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
\`\`\`

## React Router — navegación SPA

Una SPA (Single Page Application) no recarga la página al cambiar de ruta. React Router intercepta los clicks y renderiza el componente correcto.

\`\`\`jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Proyectos
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Acceder al parámetro :id
function ProjectDetail() {
  const { id } = useParams();
  return <h1>Proyecto {id}</h1>;
}
\`\`\`

## Listas y keys

Cuando renderizas una lista, cada elemento necesita una \`key\` única. Es como permitirle a React identificar cada item entre renders.

\`\`\`jsx
// ❌ MAL — usar el índice como key
items.map((item, i) => <li key={i}>{item.name}</li>)

// ✅ BIEN — usar un id estable del item
items.map((item) => <li key={item.id}>{item.name}</li>)
\`\`\`

> Si reordenas o filtras la lista, los keys con índice causan bugs raros (inputs con valor incorrecto, animaciones rotas).

## Levantamiento de estado

Si dos componentes hermanos necesitan compartir estado, súbelo al padre común:

\`\`\`jsx
function App() {
  const [filtro, setFiltro] = useState("");

  return (
    <>
      <Buscador valor={filtro} onChange={setFiltro} />
      <Lista filtro={filtro} />
    </>
  );
}
\`\`\`

Para estado que comparten **muchos** componentes, usa Context o una librería de estado (Zustand, Jotai).

## Patrones que aprenderás a evitar

- Mutar el estado: \`state.push(x)\` no dispara render. Usa \`setState([...state, x])\`.
- Llamar hooks dentro de \`if\` o \`for\`: rompe React. Hooks **siempre** al nivel superior del componente.
- Olvidar dependencias en \`useEffect\`: causa bugs invisibles.
- Sobrecargar \`useEffect\`: si puedes calcularlo durante el render, no necesitas efecto.`,
      "Componentes funcionales,JSX,useState,useEffect,Custom hooks,React Router,Listas y keys,Levantamiento de estado"
    ]);

    // ─────────────────────────────────────────────────
    // 05 — Node + Express
    // ─────────────────────────────────────────────────
    ins.run([
      "Node.js & Express — API REST",
      "Servidor backend con Express: rutas, middlewares, validación, manejo de errores y arquitectura de API REST.",
      "Node.js, Express, API REST, Middlewares",
      `## Node.js — JavaScript en el servidor

Node.js es un runtime que corre JavaScript fuera del navegador. Construido sobre el motor V8 de Chrome, le da acceso a JS al sistema de archivos, red y procesos.

> Sin Node, JS solo viviría en el navegador. Con Node, escribes el frontend y el backend en el mismo lenguaje.

## Instalar y arrancar

\`\`\`bash
mkdir mi-api && cd mi-api
npm init -y                    # crea package.json
npm install express            # instala Express
\`\`\`

\`\`\`javascript
// index.js
const express = require("express");
const app = express();

app.use(express.json()); // parsear JSON del body

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(\`Servidor en :\${PORT}\`));
\`\`\`

\`\`\`bash
node --watch index.js   # --watch reinicia al guardar (desde Node 18.11)
\`\`\`

Visitas \`http://localhost:3001/api/health\` y ya tienes una API.

## Anatomía de una request

\`\`\`javascript
app.get("/api/users/:id", (req, res) => {
  // req — todo lo que llega del cliente
  console.log(req.params.id);    // "42" — del path
  console.log(req.query.sort);   // ?sort=name
  console.log(req.body);         // JSON del body (si hay)
  console.log(req.headers);      // headers HTTP
  console.log(req.method);       // "GET"

  // res — lo que devuelves
  res.status(200).json({ id: req.params.id, name: "Ana" });
});
\`\`\`

## Rutas CRUD

Las 4 operaciones de cualquier API REST sobre un recurso (proyectos, usuarios, etc.):

\`\`\`javascript
// CREATE
app.post("/api/projects", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const result = db.run(
    "INSERT INTO projects (title, description) VALUES (?, ?)",
    [title, description]
  );

  res.status(201).json({ id: result.lastInsertRowid, title });
});

// READ — lista
app.get("/api/projects", (req, res) => {
  const rows = db.all("SELECT * FROM projects ORDER BY created_at DESC");
  res.json(rows);
});

// READ — uno
app.get("/api/projects/:id", (req, res) => {
  const row = db.get("SELECT * FROM projects WHERE id = ?", [req.params.id]);
  if (!row) return res.status(404).json({ error: "No encontrado" });
  res.json(row);
});

// UPDATE
app.put("/api/projects/:id", (req, res) => {
  db.run("UPDATE projects SET title = ? WHERE id = ?", [
    req.body.title,
    req.params.id,
  ]);
  res.json({ ok: true });
});

// DELETE
app.delete("/api/projects/:id", (req, res) => {
  db.run("DELETE FROM projects WHERE id = ?", [req.params.id]);
  res.status(204).end();
});
\`\`\`

### Códigos HTTP que importan

- \`200\` OK — todo bien
- \`201\` Created — recurso creado (POST exitoso)
- \`204\` No Content — éxito sin body (DELETE exitoso)
- \`400\` Bad Request — el cliente envió mal los datos
- \`401\` Unauthorized — no estás autenticado
- \`403\` Forbidden — autenticado pero no autorizado
- \`404\` Not Found — recurso no existe
- \`500\` Internal Server Error — explotó algo en el servidor

## Middlewares — el corazón de Express

Un middleware es una función que recibe \`(req, res, next)\` y se ejecuta entre la request y tu handler.

\`\`\`javascript
// CORS — permitir requests desde otros dominios
const cors = require("cors");
app.use(cors());

// Logger casero
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} \${req.method} \${req.url}\`);
  next(); // SIN next() la request se queda colgada
});

// Middleware para una sola ruta
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Token requerido" });
  // ... validar token
  req.user = { id: 1 }; // adjuntas datos para el handler
  next();
}

app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
\`\`\`

> El orden importa: \`app.use(cors())\` antes que las rutas. Si lo pones después, las rutas no tendrán CORS.

## Validación de input

**Nunca** confíes en lo que envía el cliente. Valida en el servidor incluso si ya validas en el frontend.

\`\`\`javascript
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Campos obligatorios
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // Formato de email
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  // Longitudes razonables (anti-abuso)
  if (name.length > 100 || message.length > 5000) {
    return res.status(400).json({ error: "Demasiado largo" });
  }

  // ... guardar
  res.status(201).json({ ok: true });
});
\`\`\`

Para validación seria, usa Zod o Joi:

\`\`\`javascript
const { z } = require("zod");

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

app.post("/api/contact", (req, res) => {
  const result = ContactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }
  // result.data ya está validado y tipado
});
\`\`\`

## Manejo de errores

Express tiene un middleware especial de errores: 4 argumentos en vez de 3.

\`\`\`javascript
// Siempre AL FINAL de todos los app.use y rutas
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production"
      ? "Error interno"
      : err.message,
  });
});

// En rutas async, captura errores así:
app.get("/api/algo", async (req, res, next) => {
  try {
    const data = await algoQuePuedeFallar();
    res.json(data);
  } catch (err) {
    next(err); // pasa al middleware de errores
  }
});
\`\`\`

## Variables de entorno

**Nunca hardcodees secretos** en el código. Usa un archivo \`.env\`:

\`\`\`bash
# .env (NO subir a git — agrégalo a .gitignore)
PORT=3001
DATABASE_URL=postgres://localhost/midb
JWT_SECRET=algo-largo-y-aleatorio
\`\`\`

\`\`\`javascript
require("dotenv").config(); // npm i dotenv

const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;
\`\`\`

## Estructura para cuando crece

Para una API pequeña, todo en \`index.js\` está bien. Cuando crece:

\`\`\`
server/
  index.js               // setup express + listen
  routes/
    projects.js          // app.get/post/put/delete sobre /api/projects
    contact.js
  middlewares/
    auth.js
    errorHandler.js
  database.js
  .env
\`\`\``,
      "Express setup,Rutas CRUD,Códigos HTTP,Middlewares,CORS,Validación de datos,Manejo de errores,Variables de entorno"
    ]);

    // ─────────────────────────────────────────────────
    // 06 — DB + Seguridad
    // ─────────────────────────────────────────────────
    ins.run([
      "Base de datos & API — Conexión y seguridad",
      "SQLite con sql.js, modelado relacional, consultas, y seguridad: SQL injection, CORS, validación, sanitización.",
      "SQLite, SQL, Seguridad, CORS, Validación",
      `## ¿Por qué una base de datos?

Las variables en memoria mueren al reiniciar el servidor. Una base de datos persiste los datos entre reinicios, soporta consultas complejas y maneja concurrencia.

**SQLite** es perfecto para empezar: cero configuración, todo en un archivo, mismo SQL que las DBs grandes.

## Crear tablas

\`\`\`sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
\`\`\`

### Tipos de datos en SQLite

- \`INTEGER\` — números enteros
- \`TEXT\` — strings
- \`REAL\` — decimales
- \`BLOB\` — datos binarios
- \`NULL\` — ausencia de valor

### Restricciones útiles

- \`PRIMARY KEY\` — identifica únicamente cada fila
- \`AUTOINCREMENT\` — número auto-generado
- \`NOT NULL\` — el campo es obligatorio
- \`UNIQUE\` — no se puede repetir
- \`DEFAULT\` — valor si no se especifica
- \`FOREIGN KEY\` — apunta a otra tabla

## CRUD en SQL

\`\`\`sql
-- INSERT
INSERT INTO projects (title, description, tech)
VALUES ('Mi App', 'Una app genial', 'React, Node');

-- SELECT
SELECT * FROM projects;
SELECT title, tech FROM projects;
SELECT * FROM projects WHERE user_id = 1;
SELECT * FROM projects ORDER BY created_at DESC LIMIT 10;

-- UPDATE
UPDATE projects SET title = 'Nuevo título' WHERE id = 1;

-- DELETE
DELETE FROM projects WHERE id = 1;
\`\`\`

## Relaciones — JOIN

Cuando dos tablas se relacionan, JOIN las combina:

\`\`\`sql
-- Proyectos con el email de su autor
SELECT
  p.title,
  p.description,
  u.email AS autor
FROM projects p
INNER JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC;
\`\`\`

Tipos de JOIN:

- \`INNER JOIN\` → solo filas con match en ambas tablas
- \`LEFT JOIN\` → todas las de la izquierda, NULL si no hay match
- \`RIGHT JOIN\` → todas las de la derecha (no existe en SQLite, se invierte)

## Agregaciones

\`\`\`sql
-- Cuántos proyectos por usuario
SELECT
  u.email,
  COUNT(p.id) AS total_proyectos
FROM users u
LEFT JOIN projects p ON p.user_id = u.id
GROUP BY u.id
HAVING COUNT(p.id) > 0
ORDER BY total_proyectos DESC;
\`\`\`

Funciones agregadas: \`COUNT\`, \`SUM\`, \`AVG\`, \`MAX\`, \`MIN\`.

## Índices — el secreto del performance

Sin índice, una búsqueda recorre toda la tabla. Con índice, va directo.

\`\`\`sql
CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_users_email ON users(email);
\`\`\`

> Crea índices en las columnas que usas en \`WHERE\`, \`JOIN\` y \`ORDER BY\`. No abuses — cada índice consume espacio y ralentiza inserts.

## SEGURIDAD — lo no negociable

### 1. SQL Injection — el error más caro

\`\`\`javascript
// ❌ NUNCA — concatenas input del usuario en la query
const userInput = req.body.name; // ej: "'; DROP TABLE users; --"
db.run("SELECT * FROM users WHERE name = '" + userInput + "'");
// → ejecuta DROP TABLE — tu DB ya no existe

// ✅ SIEMPRE — consultas parametrizadas
db.run("SELECT * FROM users WHERE name = ?", [userInput]);
// el driver escapa el valor, imposible inyectar
\`\`\`

> Esta regla **no tiene excepciones**. Cualquier valor que venga del cliente, parametrízalo.

### 2. CORS — quién puede llamar tu API

\`\`\`javascript
const cors = require("cors");

// En desarrollo: permitir todo
app.use(cors());

// En producción: SOLO tu dominio
app.use(cors({
  origin: "https://tudominio.com",
  credentials: true,
}));
\`\`\`

Sin CORS configurado, cualquier sitio puede llamar tu API desde el navegador del usuario.

### 3. Validación server-side

\`\`\`javascript
app.post("/api/contact", (req, res) => {
  const { email, message } = req.body;

  if (typeof email !== "string" || typeof message !== "string") {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: "Mensaje muy largo" });
  }

  // ... guardar
});
\`\`\`

### 4. Hash de contraseñas

**Jamás** guardes contraseñas en texto plano. Usa bcrypt:

\`\`\`javascript
const bcrypt = require("bcrypt");

// Al registrar
const hash = await bcrypt.hash(password, 10);
db.run("INSERT INTO users (email, password_hash) VALUES (?, ?)",
       [email, hash]);

// Al login
const user = db.get("SELECT * FROM users WHERE email = ?", [email]);
const ok = await bcrypt.compare(password, user.password_hash);
if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });
\`\`\`

### 5. Rate limiting — anti abuso

\`\`\`javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                  // máx 100 requests por IP en esa ventana
});

app.use("/api/", limiter);
\`\`\`

### 6. Variables de entorno

\`\`\`javascript
// ❌ MAL
const SECRET = "mi-clave-12345";

// ✅ BIEN — desde .env
const SECRET = process.env.JWT_SECRET;
\`\`\`

Y agrega \`.env\` al \`.gitignore\`. Si alguna vez subes un secret, **rótalo** — asume que está comprometido.

### 7. Helmet — headers de seguridad

\`\`\`javascript
const helmet = require("helmet");
app.use(helmet());
\`\`\`

Helmet añade headers HTTP que protegen contra XSS, clickjacking, MIME sniffing, etc. Una línea, mucho beneficio.

## Checklist de producción

Antes de subir a internet:

1. ✓ Consultas parametrizadas en TODAS las queries
2. ✓ CORS configurado con \`origin\` específico
3. ✓ Validación de input en cada endpoint
4. ✓ Contraseñas con bcrypt (nunca plano)
5. ✓ Variables sensibles en \`.env\`
6. ✓ \`.env\` en \`.gitignore\`
7. ✓ Rate limit en endpoints públicos
8. ✓ Helmet activo
9. ✓ HTTPS (Let's Encrypt es gratis)
10. ✓ Errores en producción no exponen stack traces`,
      "SQL básico,Relaciones y JOIN,Agregaciones,Índices,SQL Injection,CORS,Hash de contraseñas,Rate limiting,Helmet"
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
