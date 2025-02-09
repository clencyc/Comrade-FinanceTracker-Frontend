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
import SavingList from "../Components/SavingList";

const Dashboard = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showExpenseListModal, setShowExpenseListModal] = useState(false);
  const [showSavingsGoalForm, setShowSavingsGoalForm] = useState(false);
  const [showSavingList, setShowSavingList] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState({
    goal: "",
    target_amount: 0,
    current_amount: 0,
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/expenses/")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
        const total = data.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0
        );
        setTotalExpense(total);
      })
      .catch((error) => console.error("Error fetching expenses:", error));

    fetch("http://127.0.0.1:8000/api/goals/")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSavingsGoal(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  const toggleMenu = (item) => {
    setSelectedItem(selectedItem?.title === item.title ? null : item);
  };

  const closeModals = () => {
    setShowExpenseModal(false);
    setShowExpenseListModal(false);
    setShowSavingList(false);
    setShowSavingsGoalForm(false);
  };

  const data = [
    {
      title: "Savings",
      amount: `$${parseFloat(savingsGoal.current_amount).toFixed(2)}`,
      change: `$${Math.max(
        parseFloat(savingsGoal.target_amount) -
          parseFloat(savingsGoal.current_amount),
        0
      ).toFixed(2)} to goal`,
      icon: <Wallet className="text-blue-500" />,
      bgColor: "bg-blue-100",
      addSavings: true,
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
      addExpense: true,
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
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(item);
              }}
            >
              <MoreVertical size={18} />
            </div>
            {selectedItem?.title === item.title && (
              <div className="absolute right-2 top-10 bg-white shadow-md rounded-lg w-32 p-2">
                <ul className="text-sm text-gray-700">
                  <li
                    className="hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.title === "Expenses")
                        setShowExpenseListModal(true);
                      if (item.title === "Savings") setShowSavingList(true);
                    }}
                  >
                    View Details
                  </li>
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
            {item.addExpense && (
              <button
                className="mt-3 flex items-center text-green-600 font-medium"
                onClick={() => {
                  closeModals(); // Close all modals first
                  setShowExpenseModal(true); // Open only this modal
                }}
              >
                <PlusCircle className="mr-2" size={20} /> Add Expense
              </button>
            )}
            {item.addSavings && (
              <button
                className="mt-3 flex items-center text-blue-600 font-medium"
                onClick={() => {
                  closeModals(); // Close all modals first
                  setShowSavingsGoalForm(true); // Open only this modal
                }}
              >
                <PlusCircle className="mr-2" size={20} /> Add Your Saving Goal
              </button>
            )}
          </div>
        ))}
      </div>

      {showExpenseModal && <ExpenseForm onClose={closeModals} />}
      {showExpenseListModal && (
        <ExpenseListModal
          expenses={expenses}
          setExpenses={setExpenses}
          onClose={closeModals}
        />
      )}
      {showSavingList && <SavingList onClose={closeModals} />}
      {showSavingList && <SavingList onClose={closeModals} />}
      {showSavingsGoalForm && <SavingsGoalForm onClose={closeModals} />}
    </div>
  );
};

export default Dashboard;
