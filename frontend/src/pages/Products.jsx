import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: ""
  });

  const loadProducts = () => {
    api.get("/products/")
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/products/", {
      name: form.name,
      sku: form.sku,
      price: Number(form.price),
      stock: Number(form.stock)
    });

    setForm({
      name: "",
      sku: "",
      price: "",
      stock: ""
    });

    loadProducts();
  };

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) =>
            setForm({ ...form, sku: e.target.value })
          }
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
        />

        <button type="submit">
          Create Product
        </button>
      </form>

      <hr />

      {products.map(product => (
        <div key={product.id}>
          {product.name} | SKU: {product.sku} |
          Stock: {product.stock}
        </div>
      ))}
    </div>
  );
}

export default Products;