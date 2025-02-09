import { useState, useEffect } from "react";

const ExpenseForm = ({ initialData = null, onClose, setExpenses }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!setExpenses || typeof setExpenses !== "function") {
      console.error("setExpenses is not provided!");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    const method = initialData ? "PUT" : "POST";
    const url = initialData
      ? `http://localhost:8000/api/expenses/${initialData.id}/`
      : "http://localhost:8000/api/expenses/";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit expense");

      const updatedExpense = await response.json();

      setExpenses((prev) =>
        initialData
          ? prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
          : [...prev, updatedExpense]
      );

      setMessage(initialData ? "Expense updated successfully!" : "✅ Expense added successfully!");

      if (!initialData) setFormData({ amount: "", category: "", description: "" });

      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 2000);
    } catch (err) {
      setError("❌ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {initialData ? "Edit Expense" : "Add New Expense"}
      </h2>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {message && <p className="text-green-600 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Enter description"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500"
        >
          {loading ? "Saving..." : initialData ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
