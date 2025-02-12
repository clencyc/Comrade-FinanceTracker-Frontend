import { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  PlusCircle,
  DollarSign,
} from "lucide-react";
import ExpenseForm from "./ExpenseForm";
import ExpenseListModal from "../Components/ExpenseListModal";
import SavingsGoalForm from "../Components/SavingGoalForm";
import BudgetForm from "../Components/BudgetForm";
import BudgetList from "../Components/BudgetList";

const Dashboard = () => {
  // State definitions
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showBudgetList, setShowBudgetList] = useState(false);
  const [modalState, setModalState] = useState({
    showExpenseForm: false,
    showExpenseList: false,
    showSavingsGoal: false,
    showSavingList: false,
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesRes, goalsRes, budgetsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/expenses/"),
          fetch("http://127.0.0.1:8000/api/goals/"),
          fetch("http://127.0.0.1:8000/api/budgets/")
        ]);

        const expensesData = await expensesRes.json();
        const goalsData = await goalsRes.json();
        const budgetsData = await budgetsRes.json();

        setExpenses(expensesData);
        setTotalExpense(expensesData.reduce((sum, expense) => sum + parseFloat(expense.amount), 0));
        if (goalsData && goalsData.length > 0) setSavingsGoal(goalsData[0]);
        setBudgets(budgetsData);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Budget handlers
  const handleDeleteBudget = async (budget) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/budgets/${budget.id}/`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete budget');
      
      setBudgets(budgets.filter(b => b.id !== budget.id));
    } catch (error) {
      setError("Failed to delete budget. Please try again.");
      console.error('Error deleting budget:', error);
    }
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setShowBudgetList(false);
    setShowBudgetForm(true);
  };

  // Event handlers
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
    setShowBudgetForm(false);
    setShowBudgetList(false);
  };

  const handleModalOpen = (modalType) => {
    closeModals();
    setModalState(prev => ({
      ...prev,
      [modalType]: true
    }));
  };

  // Utility functions
  const getProgressPercentage = () => {
    if (!savingsGoal?.target_amount) return 0;
    return ((savingsGoal.current_amount / savingsGoal.target_amount) * 100).toFixed(1);
  };

  const getTotalBudget = () => {
    return budgets.reduce((total, budget) => total + parseFloat(budget.limit), 0);
  };

  const getBudgetUsagePercentage = () => {
    const totalBudget = getTotalBudget();
    if (!totalBudget) return 0;
    return ((totalExpense / totalBudget) * 100).toFixed(1);
  };
  const handleCloseBudgetForm = () => {
    setEditingBudget(null);
    setShowBudgetForm(false);
  };

  // Data preparation
  const data = [
    {
      title: "Savings Goal",
      amount: savingsGoal ? `Ksh ${parseFloat(savingsGoal.current_amount || 0).toFixed(2)}` : "No goal set",
      change: savingsGoal ? `${getProgressPercentage()}% of target` : "Set a savings goal",
      icon: <Wallet className="text-blue-500" />,
      bgColor: "bg-blue-100",
      addAction: () => handleModalOpen('showSavingsGoal'),
      actionText: "Add Savings Goal"
    },
    {
      title: "Income",
      amount: "Ksh 435",
      change: "+4%",
      icon: <TrendingUp className="text-purple-500" />,
      bgColor: "bg-purple-100",
    },
    {
      title: "Expenses",
      amount: `Ksh ${totalExpense.toFixed(2)}`,
      change: "-2%",
      icon: <TrendingDown className="text-green-500" />,
      bgColor: "bg-green-100",
      addAction: () => handleModalOpen('showExpenseForm'),
      viewDetails: () => handleModalOpen('showExpenseList'),
      actionText: "Add Expense"
    },
    {
      title: "Budget",
      amount: budgets.length ? `Ksh ${getTotalBudget().toFixed(2)}` : "No budget set",
      change: budgets.length ? `${getBudgetUsagePercentage()}% used` : "Set a budget",
      icon: <DollarSign className="text-orange-500" />,
      bgColor: "bg-orange-100",
      addAction: () => setShowBudgetForm(true),
      viewDetails: () => setShowBudgetList(true),
      actionText: "Add Budget"
    },
  ];

  return (
    <div
      className="ml-64 p-6 min-h-screen bg-gray-100 transition-all md:ml-64 sm:ml-0"
      onClick={() => setSelectedItem(null)}
    >
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <h2 className="text-2xl font-semibold">Good morning, Gabby</h2>
      <p className="text-gray-500 text-sm">long time no see</p>

      <h3 className="mt-6 text-lg font-semibold">Overview</h3>

      <div className="grid md:grid-cols-4 gap-6 mt-4">
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
                        setSelectedItem(null);
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

      {/* Modals */}
      {modalState.showExpenseForm && (
        <ExpenseForm 
          onClose={closeModals} 
          setExpenses={setExpenses}
          expenses={expenses}
        />
      )}
      
      {modalState.showExpenseList && (
        <ExpenseListModal
          expenses={expenses}
          setExpenses={setExpenses}
          onClose={closeModals}
        />
      )}
      
      {modalState.showSavingsGoal && (
        <SavingsGoalForm 
          onClose={closeModals}
          initialData={savingsGoal}
          onSave={setSavingsGoal}
        />
      )}

      {showBudgetForm && (
        <BudgetForm
          onClose={handleCloseBudgetForm}
          budgets={budgets}
          onSave={(newBudgets) => {
            setBudgets(newBudgets);
            setShowBudgetForm(false);
            setEditingBudget(null);
          }}
        />
      )}

      {showBudgetList && (
        <BudgetList
          budgets={budgets}
          onClose={closeModals}
          onEdit={handleEditBudget}
          onDelete={handleDeleteBudget}
        />
      )}
    </div>
  );
};

export default Dashboard;