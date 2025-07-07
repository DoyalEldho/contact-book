import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = ({ searchTerm }) => {
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const API = "http://localhost:5000/api/contacts"; 

  // Load all contacts on mount
  useEffect(() => {
    axios.get(API)
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  });

  // Load data into form when editing
  useEffect(() => {
    if (editId !== null) {
      const contact = contacts.find((c) => c._id === editId);
      if (contact) setForm(contact);
    } else {
      setForm({ name: "", email: "", phone: "" });
    }
  }, [editId]);

  // Add or update contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;

    try {
      if (editId !== null) {
        await axios.patch(`${API}/${editId}`, form);
        setContacts((prev) =>
          prev.map((c) => (c._id === editId ? form : c))
        );
        alert("updated")
        setEditId(null);

      } else {
        const res = await axios.post(API, form);
        setContacts([...contacts, res.data]);
        alert("Contact Entered Sucessfully");
      }
      setForm({ name: "", email: "", phone: "" });
    } catch (error) {
    if (error.response.status === 401 || error.response.status === 409) {
      alert("Email already exists!");
    } 
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (editId === id) setEditId(null);
      alert("deleted");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

// search
const filteredContacts = contacts.filter((c) => {
  const term = (searchTerm || "").toLowerCase();
  return (
    (c?.name || "").toLowerCase().includes(term) ||
    (c?.email || "").toLowerCase().includes(term)
  );
});



  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          {editId !== null ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      {/* Contact List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact._id}
            className="p-5 border border-gray-300 rounded-xl shadow-md flex justify-between items-start bg-white"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1"> {contact.phone}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditId(contact._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <p className="text-center text-gray-500">No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
