import { useState } from 'react';
import { DollarSign, Calendar, Target } from 'lucide-react';

const SavingsGoalForm = () => {
  const [formData, setFormData] = useState({
    goal: '',
    target_amount: '',
    current_amount: '',
    end_date: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.goal.trim()) {
      newErrors.goal = 'Goal name is required';
    }

    if (!formData.target_amount) {
      newErrors.target_amount = 'Target amount is required';
    } else if (isNaN(formData.target_amount) || parseFloat(formData.target_amount) <= 0) {
      newErrors.target_amount = 'Please enter a valid positive number';
    }

    if (!formData.current_amount) {
      newErrors.current_amount = 'Current amount is required';
    } else if (isNaN(formData.current_amount) || parseFloat(formData.current_amount) < 0) {
      newErrors.current_amount = 'Please enter a valid number (0 or greater)';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    } else {
      const selectedDate = new Date(formData.end_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison
      if (selectedDate <= today) {
        newErrors.end_date = 'End date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    const requestData = {
      ...formData,
      target_amount: parseFloat(formData.target_amount),
      current_amount: parseFloat(formData.current_amount),
      start_date: new Date().toISOString().split('T')[0] // Default start date to today
    };

    try {
      const response = await fetch('http://localhost:8000/api/goals/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create savings goal');
      }

      setFormData({
        goal: '',
        target_amount: '',
        current_amount: '',
        end_date: ''
      });

      alert('Savings goal created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Savings Goal</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="goal">
            <div className="flex items-center gap-2">
              <Target size={16} />
              Goal Name
            </div>
          </label>
          <input
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${errors.goal ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.goal && <p className="text-sm text-red-500 mt-1">{errors.goal}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="target_amount">
            <div className="flex items-center gap-2">
              <DollarSign size={16} />
              Target Amount
            </div>
          </label>
          <input
            id="target_amount"
            name="target_amount"
            type="number"
            step="0.01"
            value={formData.target_amount}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${errors.target_amount ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.target_amount && <p className="text-sm text-red-500 mt-1">{errors.target_amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="current_amount">
            <div className="flex items-center gap-2">
              <DollarSign size={16} />
              Current Amount
            </div>
          </label>
          <input
            id="current_amount"
            name="current_amount"
            type="number"
            step="0.01"
            value={formData.current_amount}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${errors.current_amount ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.current_amount && <p className="text-sm text-red-500 mt-1">{errors.current_amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="end_date">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              Target Date
            </div>
          </label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${errors.end_date ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.end_date && <p className="text-sm text-red-500 mt-1">{errors.end_date}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Savings Goal'}
        </button>
      </form>
    </div>
  );
};

export default SavingsGoalForm;
