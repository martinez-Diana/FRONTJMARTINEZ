import React, { useState } from "react";

const CatalogoProductos = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo de productos
  const productos = [
    {
      id: 1,
      nombre: "LEGO Classic Caja de Ladrillos Creativos",
      categoria: "LEGO",
      precio: 450.00,
      precioOriginal: null,
      stock: 24,
      badge: "Nuevo",
      badgeColor: "#ec4899",
      gradientFrom: "#fce7f3",
      gradientTo: "#fbcfe8",
      imageColor: "#f9a8d4"
    },
    {
      id: 2,
      nombre: "Barbie Dreamhouse Casa de Ensueño",
      categoria: "Barbie",
      precio: 1200.00,
      precioOriginal: 1500.00,
      stock: 8,
      badge: "-20%",
      badgeColor: "#f97316",
      gradientFrom: "#cffafe",
      gradientTo: "#a5f3fc",
      imageColor: "#67e8f9"
    },
    {
      id: 3,
      nombre: "Hot Wheels Pista de Carreras Extrema",
      categoria: "Hot Wheels",
      precio: 680.00,
      precioOriginal: null,
      stock: 15,
      badge: null,
      gradientFrom: "#fef3c7",
      gradientTo: "#fde68a",
      imageColor: "#fbbf24"
    },
    {
      id: 4,
      nombre: "Fisher-Price Teléfono Parlanchín",
      categoria: "Fisher-Price",
      precio: 280.00,
      precioOriginal: null,
      stock: 3,
      badge: "Agotándose",
      badgeColor: "#dc2626",
      gradientFrom: "#e9d5ff",
      gradientTo: "#d8b4fe",
      imageColor: "#c084fc"
    },
    {
      id: 5,
      nombre: "LEGO Star Wars Millennium Falcon",
      categoria: "LEGO",
      precio: 2500.00,
      precioOriginal: null,
      stock: 5,
      badge: "Nuevo",
      badgeColor: "#ec4899",
      gradientFrom: "#fce7f3",
      gradientTo: "#fbcfe8",
      imageColor: "#f9a8d4"
    },
    {
      id: 6,
      nombre: "Barbie Fashionista Deluxe",
      categoria: "Barbie",
      precio: 350.00,
      precioOriginal: null,
      stock: 12,
      badge: null,
      gradientFrom: "#cffafe",
      gradientTo: "#a5f3fc",
      imageColor: "#67e8f9"
    },
    {
      id: 7,
      nombre: "Hot Wheels Pack 20 Autos",
      categoria: "Hot Wheels",
      precio: 890.00,
      precioOriginal: 1050.00,
      stock: 7,
      badge: "-15%",
      badgeColor: "#f97316",
      gradientFrom: "#fef3c7",
      gradientTo: "#fde68a",
      imageColor: "#fbbf24"
    },
    {
      id: 8,
      nombre: "Fisher-Price Piano Musical",
      categoria: "Fisher-Price",
      precio: 420.00,
      precioOriginal: null,
      stock: 18,
      badge: null,
      gradientFrom: "#e9d5ff",
      gradientTo: "#d8b4fe",
      imageColor: "#c084fc"
    }
  ];

  const categorias = ["Todos", "LEGO", "Barbie", "Hot Wheels", "Fisher-Price", "Ropa"];

  const productosFiltrados = productos.filter(producto => {
    const matchCategoria = selectedCategory === "Todos" || producto.categoria === selectedCategory;
    const matchSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategoria && matchSearch;
  });

  const getColorByCategory = (categoria) => {
    const colores = {
      "LEGO": "#ec4899",
      "Barbie": "#06b6d4",
      "Hot Wheels": "#f59e0b",
      "Fisher-Price": "#a855f7",
      "Ropa": "#10b981"
    };
    return colores[categoria] || "#ec4899";
  };

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Header */}
      <header style={{
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px"
            }}>
              JM
            </div>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#1f2937", margin: 0 }}>
                Juguetería Martínez
              </h1>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                Catálogo de Productos
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button style={{
              position: "relative",
              padding: "10px",
              background: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f3f4f6"}
            onMouseLeave={(e) => e.currentTarget.style.background = "white"}>
              <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "20px",
                height: "20px",
                background: "#ec4899",
                color: "white",
                fontSize: "11px",
                fontWeight: "bold",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>3</span>
            </button>

            <button style={{
              background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
              color: "white",
              border: "none",
              padding: "10px 24px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(236, 72, 153, 0.3)",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(236, 72, 153, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(236, 72, 153, 0.3)";
            }}>
              Volver al Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>
        
        {/* Search Bar */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          padding: "24px",
          marginBottom: "32px"
        }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ flex: "1", minWidth: "250px", position: "relative" }}>
              <svg style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px"
              }} fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 48px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.3s",
                  fontFamily: "'Poppins', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ec4899";
                  e.target.style.boxShadow = "0 0 0 3px rgba(236, 72, 153, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <select style={{
              padding: "12px 16px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              fontSize: "14px",
              outline: "none",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              minWidth: "180px"
            }}>
              <option>Todas las Categorías</option>
            </select>

            <button style={{
              background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
              color: "white",
              border: "none",
              padding: "12px 32px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              Buscar
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "10px 24px",
                border: "none",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                background: selectedCategory === cat 
                  ? "linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
                  : "white",
                color: selectedCategory === cat ? "white" : "#374151",
                boxShadow: selectedCategory === cat 
                  ? "0 4px 12px rgba(236, 72, 153, 0.3)"
                  : "0 2px 6px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.background = "#f3f4f6";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.background = "white";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {productosFiltrados.map(producto => (
            <div
              key={producto.id}
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                transition: "all 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              {/* Image Container */}
              <div style={{
                position: "relative",
                height: "240px",
                background: `linear-gradient(135deg, ${producto.gradientFrom} 0%, ${producto.gradientTo} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <div style={{
                  width: "140px",
                  height: "140px",
                  background: producto.imageColor,
                  borderRadius: "12px"
                }}></div>
                
                {producto.badge && (
                  <span style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: producto.badgeColor,
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: "700"
                  }}>
                    {producto.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: "20px" }}>
                <p style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "6px",
                  fontWeight: "500"
                }}>
                  {producto.categoria}
                </p>
                
                <h3 style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "12px",
                  lineHeight: "1.4"
                }}>
                  {producto.nombre}
                </h3>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px"
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: getColorByCategory(producto.categoria)
                    }}>
                      ${producto.precio.toFixed(2)}
                    </span>
                    {producto.precioOriginal && (
                      <span style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        textDecoration: "line-through"
                      }}>
                        ${producto.precioOriginal.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <span style={{
                    fontSize: "12px",
                    color: "#6b7280"
                  }}>
                    Stock: {producto.stock}
                  </span>
                </div>

                <button style={{
                  width: "100%",
                  background: `linear-gradient(135deg, ${getColorByCategory(producto.categoria)} 0%, ${getColorByCategory(producto.categoria)}dd 100%)`,
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 6px 16px ${getColorByCategory(producto.categoria)}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "48px"
        }}>
          <button style={{
            width: "40px",
            height: "40px",
            border: "2px solid #e5e7eb",
            background: "white",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ec4899";
            e.currentTarget.style.color = "#ec4899";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.color = "inherit";
          }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer"
          }}>1</button>
          
          <button style={{
            width: "40px",
            height: "40px",
            border: "2px solid #e5e7eb",
            background: "white",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ec4899";
            e.currentTarget.style.color = "#ec4899";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.color = "inherit";
          }}>2</button>

          <button style={{
            width: "40px",
            height: "40px",
            border: "2px solid #e5e7eb",
            background: "white",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ec4899";
            e.currentTarget.style.color = "#ec4899";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.color = "inherit";
          }}>3</button>

          <button style={{
            width: "40px",
            height: "40px",
            border: "2px solid #e5e7eb",
            background: "white",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ec4899";
            e.currentTarget.style.color = "#ec4899";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.color = "inherit";
          }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogoProductos;