import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: ""
  });

  const loadOrders = () => {
    api.get("/orders/")
      .then(res => setOrders(res.data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/orders/", {
      customer_id: Number(form.customer_id),
      items: [
        {
          product_id: Number(form.product_id),
          quantity: Number(form.quantity)
        }
      ]
    });

    setForm({
      customer_id: "",
      product_id: "",
      quantity: ""
    });

    loadOrders();
  };

  return (
    <div>
      <h2>Orders</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Customer ID"
          value={form.customer_id}
          onChange={(e) =>
            setForm({
              ...form,
              customer_id: e.target.value
            })
          }
        />

        <input
          placeholder="Product ID"
          value={form.product_id}
          onChange={(e) =>
            setForm({
              ...form,
              product_id: e.target.value
            })
          }
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value
            })
          }
        />

        <button type="submit">
          Place Order
        </button>
      </form>

      <hr />

      {orders.map(order => (
        <div key={order.id}>
          Order #{order.id}
          {" "}
          Customer: {order.customer_id}
        </div>
      ))}
    </div>
  );
}

export default Orders;