const express = require("express");
const cors = require("cors");
const createDb = require("./database");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// La BD se inicializa una sola vez al arrancar el servidor
createDb().then((db) => {

  // ─── PROYECTOS ──────────────────────────────────────────────────────────────

  app.get("/api/projects", (req, res) => {
    const projects = db.all("SELECT * FROM projects ORDER BY created_at DESC");
    res.json(projects);
  });

  app.get("/api/projects/:id", (req, res) => {
    const project = db.get("SELECT * FROM projects WHERE id = ?", [req.params.id]);
    if (!project) return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json(project);
  });

  app.post("/api/projects", (req, res) => {
    const { title, description, tech, github_url, live_url } = req.body;
    if (!title || !description || !tech) {
      return res.status(400).json({ error: "title, description y tech son requeridos" });
    }
    const result = db.run(
      "INSERT INTO projects (title, description, tech, github_url, live_url) VALUES (?,?,?,?,?)",
      [title, description, tech, github_url || null, live_url || null]
    );
    res.status(201).json({ id: result.lastInsertRowid, title, description, tech });
  });

  app.delete("/api/projects/:id", (req, res) => {
    db.run("DELETE FROM projects WHERE id = ?", [req.params.id]);
    res.json({ message: "Eliminado correctamente" });
  });

  // ─── CONTACTO ────────────────────────────────────────────────────────────────

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }
    db.run("INSERT INTO messages (name, email, message) VALUES (?,?,?)", [name, email, message]);
    res.status(201).json({ message: "Mensaje recibido. ¡Gracias!" });
  });

  app.get("/api/contact", (req, res) => {
    res.json(db.all("SELECT * FROM messages ORDER BY created_at DESC"));
  });

  // ─── SALUD ───────────────────────────────────────────────────────────────────
  app.get("/api/health", (req, res) => res.json({ status: "ok", port: PORT }));

  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });

}).catch((err) => {
  console.error("❌ Error al inicializar la base de datos:", err);
  process.exit(1);
});
