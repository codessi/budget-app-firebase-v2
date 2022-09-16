import React from 'react'
// import { useBudgets } from '../../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'
import { useCollection } from '../../hooks/useCollection';
import useAuthContext from '../../hooks/useAuthContext';

export default function TotalBudgetCard({ onViewExpensesClick }) {

  const { user } = useAuthContext();
  
  const [ budgets, budgetError ] = useCollection(
    "budget",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  const [ expenses, expensesError ] = useCollection(
    "expense",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  const max = budgets?.reduce((total, budget) => { return total + parseFloat(budget.max) }, 0) 
 
  const tExpense = expenses?.reduce((total, expense) => { return total + parseFloat(expense?.amount) }, 0)

  
  return (
    <BudgetCard name = "Total Budget" max={max} amount={tExpense} noButton onViewExpensesClick={onViewExpensesClick}/>
  )
}
