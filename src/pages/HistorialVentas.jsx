import React from "react";
import "./HistorialVentas.css";

function HistorialVentas() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">🧸 Juguetería Martínez</div>
        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Punto de Venta</a>
          <a href="#">Inventario</a>
          <a href="#">Reportes</a>
        </div>
      </nav>

      <div className="container">
        <div className="page-header">
          <h1>Historial de Ventas</h1>
          <div className="header-actions">
            <button className="btn btn-secondary">📊 Exportar Excel</button>
            <button className="btn btn-primary">+ Nueva Venta</button>
          </div>
        </div>

        <div className="filters-card">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Fecha Inicio</label>
              <input type="date" defaultValue="2025-01-01" />
            </div>
            <div className="filter-group">
              <label>Fecha Fin</label>
              <input type="date" defaultValue="2025-01-31" />
            </div>
            <div className="filter-group">
              <label>Estado</label>
              <select>
                <option>Todos</option>
                <option>Completada</option>
                <option>Pendiente</option>
                <option>Cancelada</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Método de Pago</label>
              <select>
                <option>Todos</option>
                <option>Efectivo</option>
                <option>Tarjeta</option>
                <option>Transferencia</option>
              </select>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-label">Ventas Totales</div>
            <div className="stat-value">$127,450</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-label">Número de Ventas</div>
            <div className="stat-value">342</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-label">Ticket Promedio</div>
            <div className="stat-value">$372.66</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-label">Completadas</div>
            <div className="stat-value">328</div>
          </div>
        </div>

        <div className="sales-table-card">
          <div className="table-header">
            <h2>Registro de Ventas</h2>
            <div className="search-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Buscar por ID, cliente..." />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID Venta</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sale-id">#VTA-1247</td>
                <td>29/01/2025 14:32</td>
                <td>María González</td>
                <td>3 productos</td>
                <td>$2,450.00</td>
                <td>💳 Tarjeta</td>
                <td>
                  <span className="status-badge status-completed">
                    Completada
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn btn-view">👁️ Ver</button>
                    <button className="action-btn btn-print">🖨️ Ticket</button>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="sale-id">#VTA-1245</td>
                <td>28/01/2025 18:45</td>
                <td>Ana Martínez</td>
                <td>5 productos</td>
                <td>$4,320.00</td>
                <td>🏦 Transferencia</td>
                <td>
                  <span className="status-badge status-pending">Pendiente</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn btn-view">👁️ Ver</button>
                    <button className="action-btn btn-print">🖨️ Ticket</button>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="sale-id">#VTA-1242</td>
                <td>27/01/2025 15:10</td>
                <td>Roberto Sánchez</td>
                <td>1 producto</td>
                <td>$550.00</td>
                <td>💳 Tarjeta</td>
                <td>
                  <span className="status-badge status-cancelled">
                    Cancelada
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn btn-view">👁️ Ver</button>
                    <button className="action-btn btn-print">🖨️ Ticket</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pagination">
            <button>← Anterior</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Siguiente →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorialVentas;
