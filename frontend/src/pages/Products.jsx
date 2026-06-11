import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Products</h2>

      {products.map(product => (
        <div key={product.id}>
          {product.name} - Stock: {product.stock}
        </div>
      ))}
    </div>
  );
}

export default Products;