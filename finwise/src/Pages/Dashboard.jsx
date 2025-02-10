import { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  PlusCircle,
} from "lucide-react";
import ExpenseForm from "./ExpenseForm";
import ExpenseListModal from "../Components/ExpenseListModal";
import SavingsGoalForm from "../Components/SavingGoalForm";
import SavingsGoalsList from "../Components/SavingsGoalsList";

const Dashboard = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [modalState, setModalState] = useState({
    showExpenseForm: false,
    showExpenseList: false,
    showSavingsGoal: false,
    showSavingList: false,
  });
  const [savingsGoal, setSavingsGoal] = useState(null);

  useEffect(() => {
    // Fetch expenses
    fetch("http://127.0.0.1:8000/api/expenses/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        return response.json();
      })
      .then((data) => {
        setExpenses(data);
        const total = data.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0
        );
        setTotalExpense(total);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });

    // Fetch savings goals
    fetch("http://127.0.0.1:8000/api/goals/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch goals");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setSavingsGoal(data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  }, []);

  const updateExpenses = (newExpenses) => {
    setExpenses(newExpenses);
    const total = newExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );
    setTotalExpense(total);
  };

  const updateSavingsGoal = (newGoal) => {
    setSavingsGoal(newGoal);
  };

  const handleDeleteSavingsGoal = async (goal) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/goals/${goal.id}/`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
      
      setSavingsGoal(null);
      closeModals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleEditSavingsGoal = (goal) => {
    setSavingsGoal(goal);
    closeModals();
    handleModalOpen('showSavingsGoal');
  };

  const toggleMenu = (item, e) => {
    e.stopPropagation();
    setSelectedItem(selectedItem?.title === item.title ? null : item);
  };

  const closeModals = () => {
    setModalState({
      showExpenseForm: false,
      showExpenseList: false,
      showSavingsGoal: false,
      showSavingList: false,
    });
  };

  const handleModalOpen = (modalType) => {
    closeModals(); // Close all modals first
    setModalState(prev => ({
      ...prev,
      [modalType]: true
    }));
  };

  const getProgressPercentage = () => {
    if (!savingsGoal?.target_amount) return 0;
    return ((savingsGoal.current_amount / savingsGoal.target_amount) * 100).toFixed(1);
  };

  const getSavingsDisplay = () => {
    if (!savingsGoal) return {
      amount: "No goal set",
      change: "Set a savings goal",
      actionText: "Add Savings Goal"
    };

    return {
      amount: `$${parseFloat(savingsGoal.current_amount || 0).toFixed(2)}`,
      change: `${getProgressPercentage()}% of $${parseFloat(savingsGoal.target_amount || 0).toFixed(2)} goal`,
      actionText: "Update Goal"
    };
  };

  const savingsDisplay = getSavingsDisplay();

  const data = [
    {
      title: "Savings Goal",
      amount: savingsDisplay.amount,
      change: savingsDisplay.change,
      icon: <Wallet className="text-blue-500" />,
      bgColor: "bg-blue-100",
      addAction: () => handleModalOpen('showSavingsGoal'),
      viewDetails: () => handleModalOpen('showSavingList'),
      actionText: savingsDisplay.actionText
    },
    {
      title: "Income",
      amount: "$435",
      change: "+4%",
      icon: <TrendingUp className="text-purple-500" />,
      bgColor: "bg-purple-100",
    },
    {
      title: "Expenses",
      amount: `$${totalExpense.toFixed(2)}`,
      change: "-2%",
      icon: <TrendingDown className="text-green-500" />,
      bgColor: "bg-green-100",
      addAction: () => handleModalOpen('showExpenseForm'),
      viewDetails: () => handleModalOpen('showExpenseList'),
      actionText: "Add Expense"
    },
  ];

  return (
    <div
      className="ml-64 p-6 min-h-screen bg-gray-100 transition-all md:ml-64 sm:ml-0"
      onClick={() => setSelectedItem(null)}
    >
      <h2 className="text-2xl font-semibold">Good morning, Gabby</h2>
      <p className="text-gray-500 text-sm">long time no see</p>

      <h3 className="mt-6 text-lg font-semibold">Overview</h3>

      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${item.bgColor} relative`}
          >
            <div
              className="hover:bg-green-400 bg-gray-600 absolute top-2 right-2 text-white rounded-2xl cursor-pointer p-2"
              onClick={(e) => toggleMenu(item, e)}
            >
              <MoreVertical size={18} />
            </div>
            
            {selectedItem?.title === item.title && (
              <div className="absolute right-2 top-10 bg-white shadow-md rounded-lg w-32 p-2 z-10">
                <ul className="text-sm text-gray-700">
                  {item.viewDetails && (
                    <li
                      className="hover:bg-gray-200 p-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        item.viewDetails();
                      }}
                    >
                      View Details
                    </li>
                  )}
                  <li className="hover:bg-gray-200 p-2 cursor-pointer">Edit</li>
                  <li className="hover:bg-red-200 p-2 cursor-pointer text-red-600">
                    Delete
                  </li>
                </ul>
              </div>
            )}
            
            <div className="flex flex-col-reverse items-start">
              <h4 className="text-gray-700 font-medium">{item.title}</h4>
              {item.icon}
            </div>
            <p className="text-2xl font-bold mt-2">{item.amount}</p>
            <p className="text-sm text-gray-600">{item.change}</p>
            
            {item.addAction && (
              <button
                className="mt-3 flex items-center text-blue-600 font-medium"
                onClick={item.addAction}
              >
                <PlusCircle className="mr-2" size={20} /> {item.actionText}
              </button>
            )}
          </div>
        ))}
      </div>

      {modalState.showExpenseForm && (
        <ExpenseForm 
          onClose={closeModals} 
          setExpenses={updateExpenses}
          expenses={expenses}
        />
      )}
      
      {modalState.showExpenseList && (
        <ExpenseListModal
          expenses={expenses}
          setExpenses={updateExpenses}
          onClose={closeModals}
        />
      )}
      
      {modalState.showSavingList && (
        <SavingsGoalsList
          savingsGoals={[savingsGoal].filter(Boolean)}
          onClose={closeModals}
          onEdit={handleEditSavingsGoal}
          onDelete={handleDeleteSavingsGoal}
        />
      )}
      
      {modalState.showSavingsGoal && (
        <SavingsGoalForm 
          onClose={closeModals}
          initialData={savingsGoal}
          onSave={updateSavingsGoal}
        />
      )}
    </div>
  );
};

export default Dashboard;