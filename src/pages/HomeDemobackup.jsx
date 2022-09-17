import { useState } from "react";
import AddBudgetModal from "../components/localStorage/AddBudgetModal";
import AddExpenseModal from "../components/localStorage/AddExpenseModal";
import BudgetCard from "../components/localStorage/BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import UncategorizedBudgetCard from "../components/localStorage/UncategorizedBudgetCard";
import TotalBudgetCard from "../components/localStorage/TotalBudgetCard";
import ViewExpensesModal from "../components/localStorage/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] =
    useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };
  const openViewExpensesModal = (budgetId) => {
    setShowViewExpensesModal(true);
    setViewExpensesModalBudgetId(budgetId);
  };

  const { budgets, getBudgetExpenses } = useBudgets();

  const amount = (budgetId) => {
    const expenseObjArr = getBudgetExpenses(budgetId);
    const result = expenseObjArr.reduce((total, expense) => {
      return total + parseFloat( expense.amount);
    }, 0);

    return result;
  };

  return (
    <>
      <div className="p-4 md:p-8   min-h-screen bg-slate-300">
        <div className="border-8 md:border-4 md:pb-6   bg-gray-100 max-w-sm md:max-w-4xl mx-auto min-h-screen md:min-h-[70vh]  rounded-[3.3rem] md:rounded-[2rem]  border-white overflow-hidden" >
          <div direction="horizontal" className="flex-col  p-5 pt-10 pb-6 justify-between text-white bg-teal-600/90 mb-4">
            <div className="flex justify-between">
              <h1 className="text-3xl mb-3  font-semibold">Budget App</h1>
              <p className="mr-7 bg-teal-500 p-2 rounded">This is a demo. <br/> Login to see your budget. </p>
            </div>
            <div className="flex gap-2">
              <button className="outline outline-teal-300/90 text-white p-1 px-3 rounded-lg hover:outline-white transtion duration-200" onClick={() => setShowAddBudgetModal(true)}>
                Add Budget
              </button>
              <button className="outline outline-teal-300/90 text-white p-1 px-3 rounded-lg hover:outline-white transtion duration-200" onClick={openAddExpenseModal}>
                Add Expense
              </button>
            </div>
          </div>
          <div className="m-2"
            style={{
              display: "grid",
              gridTemplateColumns: "Repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "start",
            }}
          >
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.budgetId}
                name={budget.name}
                amount={amount(budget.budgetId)}
                gray={true}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.budgetId)}
                onViewExpensesClick={() => openViewExpensesModal(budget.budgetId)}
              />
            ))}
            <UncategorizedBudgetCard
              onAddExpenseClick={() =>
                openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)
              }
              onViewExpensesClick={() =>
                openViewExpensesModal(UNCATEGORIZED_BUDGET_ID)
              }
            />
            <TotalBudgetCard   onViewExpensesClick={() =>
                openViewExpensesModal()
              } />
          </div>
        </div>
      </div>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />

      <ViewExpensesModal
        show={showViewExpensesModal}
        handleClose={() => setShowViewExpensesModal(false)}
        budgetId={viewExpensesModalBudgetId}
      />
    </>
  );
}

export default App;
