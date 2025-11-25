import React from "react";
import "./Administrador.css";

const Administrador = () => {
  return (
    <div className="admin-body">
      {/* Header */}
      <header className="admin-header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo-circle">JM</div>
            <div>
              <h1 className="header-title">Juguetería Martínez</h1>
              <p className="header-subtitle">Panel Administrativo</p>
            </div>
          </div>
          <div className="header-right">
            <button className="header-button">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
            <div className="header-user">
              <span>Admin</span>
              <div className="user-avatar"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav>
            <a href="#" className="active">
              Dashboard
            </a>
            <a href="#">Productos</a>
            <a href="#">Ventas</a>
            <a href="#">Inventario</a>
            <a href="#">Apartados</a>
            <a href="#">Clientes</a>
            <a href="#">Reportes</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="section-header">
            <h2>Dashboard</h2>
            <p>Resumen general del negocio</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="card pink">
              <h3>$45,230</h3>
              <p>Ventas del Mes</p>
            </div>
            <div className="card cyan">
              <h3>342</h3>
              <p>Productos Vendidos</p>
            </div>
            <div className="card yellow">
              <h3>927</h3>
              <p>Productos en Stock</p>
            </div>
            <div className="card purple">
              <h3>1,245</h3>
              <p>Clientes Registrados</p>
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="data-grid">
            <div className="data-box">
              <h3>Productos Más Vendidos</h3>
              <div className="item">
                <span>LEGO Classic</span>
                <p>87 unidades - $12,450</p>
              </div>
              <div className="item">
                <span>Barbie Dreamhouse</span>
                <p>64 unidades - $9,280</p>
              </div>
              <div className="item">
                <span>Hot Wheels Set</span>
                <p>52 unidades - $7,150</p>
              </div>
            </div>

            <div className="data-box">
              <h3>Ventas Recientes</h3>
              <div className="item">
                <span>Venta #1234 - María González</span>
                <p>$450.00 - Hace 5 min</p>
              </div>
              <div className="item">
                <span>Venta #1233 - Juan Pérez</span>
                <p>$1,200.00 - Hace 12 min</p>
              </div>
              <div className="item">
                <span>Venta #1232 - Ana Martínez</span>
                <p>$780.00 - Hace 25 min</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Administrador;
