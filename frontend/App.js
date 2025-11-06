import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // 🧠 Fetch all products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ➕ Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // If product already exists, don't duplicate
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) return prevCart;
      return [...prevCart, product];
    });
  };

  // ❌ Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // 💰 Calculate total
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* 🛍️ PRODUCTS SECTION */}
      <div style={{ flex: 2 }}>
        <h1>🛒 Products</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              }}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              )}
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <h3>₹{product.price}</h3>
              <p>Stock: {product.stock}</p>
              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🧺 CART SECTION */}
      <div style={{ flex: 1 }}>
        <h1>🛍️ Your Cart</h1>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cart.map((item) => (
                <li
                  key={item._id}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "8px",
                  }}
                >
                  <span>
                    {item.name} — ₹{item.price}
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    ❌ Remove
                  </button>
                </li>
              ))}
            </ul>
            <h3>Total: ₹{totalPrice}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
