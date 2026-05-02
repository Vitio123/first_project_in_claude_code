// Base URL — en desarrollo Vite hace proxy de /api a http://localhost:3001
const BASE = "/api";

export const api = {
  // Proyectos
  getProjects: () => fetch(`${BASE}/projects`).then((r) => r.json()),

  createProject: (data) =>
    fetch(`${BASE}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteProject: (id) =>
    fetch(`${BASE}/projects/${id}`, { method: "DELETE" }).then((r) => r.json()),

  // Contacto
  sendMessage: (data) =>
    fetch(`${BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
};
