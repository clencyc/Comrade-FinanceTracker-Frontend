

// Simple Progress Bar Component
const ProgressBar = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);

const SavingsGoalsList = ({ savingsGoals = [], onClose, onEdit, onDelete }) => {
  if (!savingsGoals?.length) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg relative">
          <button
            className="absolute top-4 right-4 text-red-600 bg-red-100 hover:bg-red-500 hover:text-white p-2 rounded-full transition-all"
            onClick={onClose}
          >
            {/* X icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Saving Goals</h2>
          <p className="text-gray-500 text-center py-8">No savings goals yet. Create one to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-red-600 bg-red-100 hover:bg-red-500 hover:text-white p-2 rounded-full transition-all"
          onClick={onClose}
        >
          {/* X icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Saving Goals</h2>
        
        <div className="space-y-6">
          {savingsGoals.map((goal) => {
            const targetAmount = parseFloat(goal.target_amount || 0);
            const currentAmount = parseFloat(goal.current_amount || 0);
            const remainingAmount = targetAmount - currentAmount;
            const progress = (currentAmount / targetAmount) * 100;
            
            const endDate = new Date(goal.end_date);
            const today = new Date();
            const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="border rounded-lg p-6 space-y-4 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">{goal.goal}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit?.(goal)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      {/* Edit icon */}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete?.(goal)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      {/* Delete icon */}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <ProgressBar value={progress} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Current Savings</p>
                    <p className="font-semibold text-green-600">
                      ${currentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Target Amount</p>
                    <p className="font-semibold">
                      ${targetAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining Amount</p>
                    <p className="font-semibold text-blue-600">
                      ${remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Days Remaining</p>
                    <p className={`font-semibold ${daysRemaining < 30 ? 'text-red-600' : 'text-gray-800'}`}>
                      {daysRemaining} days
                    </p>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 pt-2">
                  <p>Started: {new Date(goal.start_date).toLocaleDateString()}</p>
                  <p>Target Date: {new Date(goal.end_date).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalsList;