import { useRef } from "react";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const { addExpense, budgets } = useBudgets();

  const amountRef = useRef();
  const descriptionRef = useRef();
  const budgetIdRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      budgetId: budgetIdRef.current.value,
    });

    handleClose();
  };



  return (
    <div className={`fixed  flex justify-center items-center inset-0 bg-gray-900/80 ${show ? "" : "hidden"}  `}>
      <div
        className="bg-white rounded-lg  p-5 w-96"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-">New Expense</h3>
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
          <hr className="border-1 border-gray-500/40 -mx-5" />
          <div>
            <div className="my-4" >
              <label className="space-y-1">
                <h3>Description</h3>
                <input
                  className="w-full placeholder:p-1 outline outline-slate-200 rounded"
                  ref={descriptionRef}
                  placeholder="description"
                  type="text"
                  required
                />
              </label>
            </div>
            <div className="mb-3" >
              <label className="space-y-1">
                <h3>Amount</h3>
                <input
                  className="w-full placeholder:p-1 outline outline-slate-200 rounded"
                  placeholder="amount"
                  ref={amountRef}
                  type="number"
                  min={0}
                  step={0.01}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="space-y-1">
                <h3>Budget</h3>
                <select  className="w-full p-1 outline outline-slate-200 rounded text-slate-400"
                  ref={budgetIdRef}
                  defaultValue={defaultBudgetId}
                  aria-label="Default blah example"
                >
                  <option  id={UNCATEGORIZED_BUDGET_ID}>uncategorized </option>
                  {budgets.map((budget) => (
                    <option  key={budget.budgetId} value={budget.budgetId}>
                      {budget.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                className="outline rounded outline-blue-400  p-1 px-3 "
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
