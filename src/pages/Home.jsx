import { useState } from "react";
import AddBudgetModal from "../components/firebase/AddBudgetModal";
import AddExpenseModal from "../components/firebase/AddExpenseModal";
import BudgetCard from "../components/firebase/BudgetCard";
import {
  UNCATEGORIZED_BUDGET_ID
} from "../contexts/BudgetsContext";
import UncategorizedBudgetCard from "../components/firebase/UncategorizedBudgetCard";
import TotalBudgetCard from "../components/firebase/TotalBudgetCard";
import ViewExpensesModal from "../components/firebase/ViewExpensesModal";
import useAuthContext from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";
import userEvent from "@testing-library/user-event";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };
  const openViewExpensesModal = (budgetId) => {
    setShowViewExpensesModal(true);
    setViewExpensesModalBudgetId(budgetId);
  };

let { user } = useAuthContext();
  if (!user) {
    user = {
    uid: "demo"
  }}


  const [ budgets, budgetError ] = useCollection(
    "budget",
    ["uid", "==", user?.uid],
    ["createdAt", "desc"]
  );

  const [ expenses, expensesError ] = useCollection(
    "expense",
    ["uid", "==", user?.uid],
    ["createdAt", "desc"]
  );



  

  const amount = (budgetId) => {
    const filteredExpenses = expenses.filter(item => item.budgetId === budgetId)
    const result = filteredExpenses.reduce((total, expense) => {
          return total + parseFloat(expense.amount);
    }, 0);
  
    return result
  }


  return (
    <>
      <div className="p-4 md:p-8   min-h-screen bg-slate-300">
        <div className="border-8 md:border-4 md:pb-6 pb-3  bg-gray-100 max-w-sm md:max-w-4xl mx-auto min-h-screen md:min-h-[70vh]  rounded-[3.3rem] md:rounded-[2rem]  border-white overflow-hidden">
          <div
            direction="horizontal"
            className="flex-col  p-5 pt-10 pb-6 justify-between text-white bg-teal-600/90 mb-4"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl mb-3  font-semibold">Budget App</h1>
              <div>
                <p className="mr-7 bg-teal-500 px-4 rounded">
                  {user.uid==="demo"? "Demo" : user?.displayName}'s Budget
                </p>
                {budgetError && <p>{budgetError}</p>}
                {expensesError && <p>{expensesError}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="outline outline-teal-300/90 text-white p-1 px-3 rounded-lg hover:outline-white transtion duration-200"
                onClick={() => setShowAddBudgetModal(true)}
              >
                Add Budget
              </button>
              <button
                className="outline outline-teal-300/90 text-white p-1 px-3 rounded-lg hover:outline-white transtion duration-200"
                onClick={openAddExpenseModal}
              >
                Add Expense
              </button>
            </div>
          </div>
          <div
            className="m-2 gap-5 "
            style={{
              display: "grid",
              gridTemplateColumns: "Repeat(auto-fit, minmax(300px, 1fr))",
              alignItems: "start",
            }}
          >

            {budgets && budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount(budget.id)}
                gray={true}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  openViewExpensesModal(budget.id)
                }
              />
            ))}
            <UncategorizedBudgetCard 
             user={user}
              onAddExpenseClick={() =>
                openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)
              }
              onViewExpensesClick={() =>
                openViewExpensesModal(UNCATEGORIZED_BUDGET_ID)
              }
            />
            <TotalBudgetCard
              user={user}
              onViewExpensesClick={() => openViewExpensesModal()}
            />
          </div>
        </div>
      </div>
      <AddBudgetModal
        user ={user}
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        user ={user}
        show={showAddExpenseModal}
        budgets={budgets}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />

      <ViewExpensesModal
        user={user}
        show={showViewExpensesModal}
        handleClose={() => setShowViewExpensesModal(false)}
        budgetId={viewExpensesModalBudgetId}
      />
    </>
  );
}

export default App;
