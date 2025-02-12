import { useState } from 'react';
import { X, Pencil, Trash2 } from 'lucide-react';

const BudgetList = ({ budgets, onClose, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDelete = async (budget) => {
    setIsDeleting(true);
    setDeleteError('');

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/budgets/${budget.id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete budget');
      }

      onDelete(budget);
    } catch (error) {
      setDeleteError('Failed to delete budget. Please try again.');
      console.error('Error deleting budget:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Budget List</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {deleteError && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
              {deleteError}
            </div>
          )}

          {budgets.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No budgets found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Limit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {budgets.map((budget) => (
                    <tr key={budget.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {budget.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Ksh {parseFloat(budget.limit).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(budget.start_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(budget.end_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => onEdit(budget)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          disabled={isDeleting}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(budget)}
                          className="text-red-600 hover:text-red-800"
                          disabled={isDeleting}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetList;