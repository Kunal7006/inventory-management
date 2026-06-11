import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const loadCustomers = () => {
    api.get("/customers/")
      .then(res => setCustomers(res.data));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/customers/", form);

    setForm({
      name: "",
      email: ""
    });

    loadCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button type="submit">
          Create Customer
        </button>
      </form>

      <hr />

      {customers.map(customer => (
        <div key={customer.id}>
          {customer.name} - {customer.email}
        </div>
      ))}
    </div>
  );
}

export default Customers;