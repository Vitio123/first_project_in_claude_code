import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-enter" style={{ textAlign: "center", padding: "120px 22px" }}>
      <p className="eyebrow" style={{ animation: "fadeInUp 0.6s var(--smooth) 0.1s both" }}>Error</p>
      <h1
        className="headline-gradient"
        style={{ marginBottom: 16, animation: "fadeInScale 0.8s var(--bounce) 0.2s both" }}
      >
        404
      </h1>
      <p className="body-copy" style={{ marginBottom: 32, animation: "blurIn 0.8s var(--smooth) 0.5s both" }}>
        Esta página no existe o fue movida.
      </p>
      <div style={{ animation: "fadeInUp 0.6s var(--smooth) 0.7s both" }}>
        <Link to="/" className="btn-apple btn-apple-dark">Volver al inicio</Link>
      </div>
    </div>
  );
}
