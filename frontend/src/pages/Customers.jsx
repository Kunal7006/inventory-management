import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get("/customers/")
      .then(res => setCustomers(res.data));
  }, []);

  return (
    <div>
      <h2>Customers</h2>

      {customers.map(customer => (
        <div key={customer.id}>
          {customer.name} - {customer.email}
        </div>
      ))}
    </div>
  );
}

export default Customers;