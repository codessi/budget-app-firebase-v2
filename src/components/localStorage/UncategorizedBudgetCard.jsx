import { useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "../../contexts/BudgetsContext";


export default function UncategorizedBudgetCard({

  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const { getBudgetExpenses } = useBudgets();

  const amount= getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (a, b) => a + parseFloat(b.amount),
    0
  )



  return (
    <BudgetCard
      name={UNCATEGORIZED_BUDGET_ID}
      amount={amount}
      gray
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
    />
  );
}
