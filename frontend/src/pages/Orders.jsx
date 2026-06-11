import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/")
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders.map(order => (
        <div key={order.id}>
          Order #{order.id} - Customer {order.customer_id}
        </div>
      ))}
    </div>
  );
}

export default Orders;