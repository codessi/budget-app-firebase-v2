import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "./../../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

export default function ViewExpensesModal({ show, handleClose, budgetId }) {
  const { getBudgetExpenses, expenses, deleteBudget, deleteExpense, budgets } =
    useBudgets();

  let expensesArr = () => {
    if (budgetId !== undefined) {
      return getBudgetExpenses(budgetId);
    }
    return expenses;
  };

  expensesArr = expensesArr();

  const handleDeleteBudget = () => {
    // match the  BudgetId
    deleteBudget(budgetId);
  };
  const handleDeleteExpense = (expenseId) => {
    deleteExpense(expenseId);
  };

  //
  let name;

  if (budgetId == UNCATEGORIZED_BUDGET_ID) {
    name = "Uncategorized";
  } else if (budgetId == undefined) {
    name = "Total";
  } else if (budgetId) {
    name = budgets?.find((obj) => obj.budgetId === budgetId)?.name;
  }

  return (
    <div className={`fixed  flex justify-center items-center inset-0 bg-gray-900/80 ${show ? "" : "hidden"}  `}>
      <div
        className="bg-white rounded-lg  p-5 w-96"
      >
        <div className="flex justify-between mb-4  ">
          <h3 className="text-xl">{name} Expense</h3>

          {budgetId !== UNCATEGORIZED_BUDGET_ID && budgetId !== undefined ? (
            <button
             
              className="bg-red-400 text-white  text-[10px]  h-4 px-1 rounded"
              onClick={handleDeleteBudget}
            >
              Delete Budget
            </button>
          ) : (
            <></>
          )}

          <button onClick={handleClose}>
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="20px"
              height="20px"
            >
              <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
            </svg>
          </button>
        </div>

        <div>
          {expensesArr.map((expense) => (
            <div key={expense.id}>
              <div className=" flex justify-between ">
                <div className="w-75">{expense.description}</div>
                <div className="flex items-center gap-5">
                  <div className="me-4 w-25" style={{ textAlign: "right" }}>
                    {currencyFormatter.format(expense.amount)}
                  </div>
                  <button
                    className="outline rounded-sm outline-blue-300 h-5"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    <svg
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="17px"
                      height="17px"
                    >
                      <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
