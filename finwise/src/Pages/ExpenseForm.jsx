import { useState } from 'react';
import { DollarSign, Tag, FileText } from 'lucide-react';

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/expenses/', {  // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit expense');
      }

      setSuccess(true);
      setFormData({
        amount: '',
        category: '',
        description: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="w-full h-[90vh] max-w-md mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
        Add New Expense
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Category Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              maxLength={50}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Enter category"
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Enter description (optional)"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
        )}

        {/* Success Message */}
        {success && (
          <div className="text-green-500 text-sm mt-2 text-center">
            Expense added successfully!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 font-medium text-lg"
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
    </>
  );
};

export default ExpenseForm;