import React, { useState } from "react";
import "./Cart.css";

function Cart() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "LEGO Star Wars Millennium Falcon",
      sku: "LEGO-75257 | 1,351 piezas",
      price: 2499,
      qty: 1,
      stock: "En stock",
    },
    {
      id: 2,
      name: "Barbie Dreamhouse Aventuras",
      sku: "BARBIE-2024 | Casa de muñecas",
      price: 1899,
      qty: 2,
      stock: "Últimas 3 unidades",
    },
    {
      id: 3,
      name: "Hot Wheels Pista Mega Looping",
      sku: "HW-LOOP-01 | Incluye 2 autos",
      price: 799,
      qty: 1,
      stock: "En stock",
    },
  ]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const descuento = 500;
  const envio = 150;
  const total = subtotal - descuento + envio;

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Mi Carrito de Compras</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          <h3>{items.length} productos en tu carrito</h3>

          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <div className="item-img"></div>
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.sku}</p>
                  <span
                    className={`stock-label ${
                      item.stock.includes("Últimas") ? "low" : "in-stock"
                    }`}
                  >
                    {item.stock}
                  </span>
                </div>
              </div>

              <div className="item-actions">
                <p className="item-price">
                  ${item.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </p>
                <div className="qty-controls">
                  <button onClick={() => updateQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑️
                  </button>
                </div>
                <p className="subtotal">
                  Subtotal: ${(item.price * item.qty).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Resumen del Pedido</h3>
          <div className="summary-details">
            <p>
              Subtotal ({items.length} artículos)
              <span>${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
            </p>
            <p>
              Descuento
              <span className="discount">-${descuento.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
            </p>
            <p>
              Envío
              <span>${envio.toFixed(2)}</span>
            </p>
          </div>

          <div className="coupon-box">
            <input type="text" placeholder="Código de descuento" />
            <button>Aplicar cupón</button>
          </div>

          <div className="total">
            <h2>Total</h2>
            <h2 className="total-price">
              ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </h2>
          </div>

          <button className="pay-btn">Proceder al Pago</button>
          <button className="continue-btn">Continuar Comprando</button>

          <div className="payment-methods">
            <p>Métodos de pago aceptados</p>
            <div className="methods">
              <span>VISA</span>
              <span>MC</span>
              <span>AMEX</span>
              <span>OXXO</span>
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
