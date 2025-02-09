import { X } from "lucide-react";

const ExpenseListModal = ({ expenses, setExpenses, onClose }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/expenses/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete expense");

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 bg-red-100 hover:bg-red-500 hover:text-white p-2 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Expense List</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="border-b py-3 flex justify-between">
                <div>
                  <p className="text-gray-700">
                    {expense.description} - <span className="font-bold">${expense.amount}</span>
                  </p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseListModal;
