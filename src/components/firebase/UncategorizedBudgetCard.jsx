import { useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "./../../contexts/BudgetsContext";
import useAuthContext from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";


export default function UncategorizedBudgetCard({
  onAddExpenseClick,
  onViewExpensesClick, user
}) {

  // const { user } = useAuthContext();


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
    const filteredExpenses = expenses?.filter(item => item.budgetId === budgetId)
    const result = filteredExpenses?.reduce((total, expense) => {
          return total + parseFloat(expense.amount);
    }, 0);

    
    return result

  }
   

  return (
    <BudgetCard
      name={UNCATEGORIZED_BUDGET_ID}
      amount={amount("uncategorized")}
      gray
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
    />
  );
}
