import React from 'react'
import BudgetCard from './BudgetCard'
import { useCollection } from '../../hooks/useCollection';
import useAuthContext from '../../hooks/useAuthContext';

export default function TotalBudgetCard({ onViewExpensesClick, user }) {

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

  console.log(expenses)

  const max = budgets?.reduce((total, budget) => { return total + parseFloat(budget.max) }, 0) 
 
  const tExpense = expenses?.reduce((total, expense) => { return total + parseFloat(expense?.amount) }, 0)

  
  return (
    <div className="outline rounded-md outline-gray-400">
      <BudgetCard name = "Total Budget" max={max} amount={tExpense} noButton onViewExpensesClick={onViewExpensesClick}/>
    </div>
  )
}
