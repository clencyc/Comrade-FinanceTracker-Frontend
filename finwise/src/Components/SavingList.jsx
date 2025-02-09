import { X } from "lucide-react";

const SavingList = ({ savingsGoal, onClose }) => {
  // Prevent error if savingsGoal is undefined
  if (!savingsGoal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg relative">
          <button
            className="absolute top-4 right-4 text-red-600 bg-red-100 hover:bg-red-500 hover:text-white p-2 rounded-full transition-all"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Saving Goals</h2>
          <p className="text-gray-500 text-center">No goal data available.</p>
        </div>
      </div>
    );
  }

  const targetAmount = parseFloat(savingsGoal.target_amount || 0);
  const currentAmount = parseFloat(savingsGoal.current_amount || 0);
  const remainingAmount = targetAmount - currentAmount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-red-600 bg-red-100 hover:bg-red-500 hover:text-white p-2 rounded-full transition-all"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Saving Goals</h2>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg shadow-md">
            <h3 className="font-semibold">{savingsGoal.goal || "No Goal Set"}</h3>
            <p className="text-gray-600">
              Target Amount: ${targetAmount.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Current Savings: ${currentAmount.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Remaining: ${remainingAmount.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Start Date: {savingsGoal.start_date || "N/A"}
            </p>
            <p className="text-gray-600">
              End Date: {savingsGoal.end_date || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingList;
