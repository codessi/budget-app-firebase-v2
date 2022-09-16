import React from "react";
import { useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard({ onViewExpensesClick }) {
  const { budgets, expenses } = useBudgets();
  const max = budgets.reduce((total, budget) => {
    return total + parseFloat(budget.max);
  }, 0);

  const tExpense = expenses.reduce((total, expense) => {
    return total + parseFloat(expense?.amount);
  }, 0);

  return (
    <BudgetCard
      name="Total Budget"
      max={max}
      amount={tExpense}
      noButton
      onViewExpensesClick={onViewExpensesClick}
    />
  );
}
