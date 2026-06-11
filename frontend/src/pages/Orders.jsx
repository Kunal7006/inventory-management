import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    api.get("/orders/").then(res => setOrders(res.data));
    api.get("/customers/").then(res => setCustomers(res.data));
    api.get("/products/").then(res => setProducts(res.data));
  }, []);

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders/", {
        customer_id: Number(customerId),
        items: [
          {
            product_id: Number(productId),
            quantity: Number(quantity)
          }
        ]
      });

      alert("Order Created!");

      const res = await api.get("/orders/");
      setOrders(res.data);

    } catch (err) {
      alert(
        err?.response?.data?.detail ||
        "Failed to create order"
      );
    }
  };

  return (
    <div>
      <h2>Orders</h2>

      <form onSubmit={createOrder}>
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="">Select Customer</option>

          {customers.map(customer => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>
          ))}
        </select>

        <br /><br />

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>

          {products.map(product => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name} (Stock: {product.stock})
            </option>
          ))}
        </select>

        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Place Order
        </button>
      </form>

      <hr />

      {orders.map(order => (
        <div key={order.id}>
            <strong>Order #{order.id}</strong>
            <br />
            Customer: {order.customer_name}
            <br />
            Product: {order.product_name}
            <br />
            Quantity: {order.quantity}
            <hr />
        </div>
        ))}
    </div>
  );
}

export default Orders;