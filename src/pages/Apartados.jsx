import React from "react";
import "./Apartados.css";

function Apartados() {
  const apartados = [
    {
      id: 1234,
      producto: "LEGO Classic Caja Grande",
      cliente: "María González Pérez",
      total: 450,
      anticipo: 90,
      abonado: 180,
      pendiente: 270,
      progreso: 40,
      estado: "Activo",
      vence: "15 de Octubre, 2025",
      color: "morado",
    },
    {
      id: 1235,
      producto: "Barbie Dreamhouse",
      cliente: "Ana Martínez López",
      total: 1200,
      anticipo: 240,
      abonado: 840,
      pendiente: 360,
      progreso: 70,
      estado: "Activo",
      vence: "20 de Octubre, 2025",
      color: "rosa",
    },
    {
      id: 1236,
      producto: "Hot Wheels Pista Extrema",
      cliente: "Juan Pérez Ramírez",
      total: 680,
      anticipo: 136,
      abonado: 136,
      pendiente: 544,
      progreso: 20,
      estado: "Próximo a Vencer",
      vence: "08 de Octubre, 2025 (3 días)",
      color: "naranja",
    },
  ];

  return (
    <div className="apartados-page">
      {/* HEADER */}
      <header className="apartados-header">
        <div className="header-left">
          <div className="logo">JM</div>
          <div>
            <h1>Gestión de Apartados</h1>
            <p>Control de reservas y pagos</p>
          </div>
        </div>
        <button className="btn-white">Volver al Dashboard</button>
      </header>

      {/* ACTION BAR */}
      <div className="action-bar">
        <button className="btn-gradient">+ Nuevo Apartado</button>
        <div className="status-buttons">
          <button className="btn-active">Activos (24)</button>
          <button className="btn-gray">Liquidados (156)</button>
          <button className="btn-gray">Vencidos (8)</button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card purple">
          <div className="stat-header">
            <div className="icon">⏰</div>
            <span>24 activos</span>
          </div>
          <h3>$18,450</h3>
          <p>Total en Apartados</p>
        </div>

        <div className="stat-card pink">
          <div className="stat-header">
            <div className="icon">💰</div>
            <span>+12 este mes</span>
          </div>
          <h3>$7,230</h3>
          <p>Anticipos Recibidos</p>
        </div>

        <div className="stat-card cyan">
          <div className="stat-header">
            <div className="icon">💸</div>
            <span>Pendiente</span>
          </div>
          <h3>$11,220</h3>
          <p>Por Cobrar</p>
        </div>
      </div>

      {/* LISTA DE APARTADOS */}
      <div className="apartados-list">
        <h2>Apartados Activos</h2>

        {apartados.map((a) => (
          <div
            key={a.id}
            className={`apartado-card ${a.color === "naranja" ? "alerta" : ""}`}
          >
            <div className="apartado-header">
              <div className="info-left">
                <div className={`thumb ${a.color}`}></div>
                <div>
                  <h3>{a.producto}</h3>
                  <p>Cliente: {a.cliente}</p>
                  <div className="tags">
                    <span className="tag purple">Apartado #{a.id}</span>
                    <span
                      className={`tag ${
                        a.estado === "Activo"
                          ? "green"
                          : a.estado === "Próximo a Vencer"
                          ? "yellow"
                          : ""
                      }`}
                    >
                      {a.estado === "Próximo a Vencer" ? "⚠️ " : ""}
                      {a.estado}
                    </span>
                  </div>
                </div>
              </div>

              <div className="info-right">
                <p className="precio">${a.total.toFixed(2)}</p>
                <p className="sub">Precio Total</p>
              </div>
            </div>

            {/* TRES COLUMNAS */}
            <div className="monto-grid">
              <div className="box pink">
                <p>Anticipo (20%)</p>
                <h4>${a.anticipo.toFixed(2)}</h4>
              </div>
              <div className="box cyan">
                <p>Abonado</p>
                <h4>${a.abonado.toFixed(2)}</h4>
              </div>
              <div className="box orange">
                <p>Pendiente</p>
                <h4>${a.pendiente.toFixed(2)}</h4>
              </div>
            </div>

            {/* PROGRESO */}
            <div className="progreso">
              <div className="prog-top">
                <span>Progreso de Pago</span>
                <span
                  className={
                    a.color === "naranja" ? "orange" : "purple"
                  }
                >
                  {a.progreso}%
                </span>
              </div>
              <div className="barra">
                <div
                  className={`relleno ${a.color}`}
                  style={{ width: `${a.progreso}%` }}
                ></div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="apartado-footer">
              <div
                className={`vence ${
                  a.color === "naranja" ? "alert-text" : ""
                }`}
              >
                📅 Vence: {a.vence}
              </div>
              <div className="acciones">
                <button
                  className={`btn-${
                    a.color === "naranja" ? "orange" : "purple"
                  }`}
                >
                  Registrar Abono
                </button>
                <button className="btn-gray">Ver Detalles</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Apartados;
