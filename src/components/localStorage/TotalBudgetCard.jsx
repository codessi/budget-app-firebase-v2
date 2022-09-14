import React from 'react'
import { useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

// -- I want total bugetCard to have
//  -- total of all budget max
//  -- total of all expense 
//  -- bar
//  -- no add or view button  
export default function TotalBudgetCard({onViewExpensesClick}) {
  const { budgets, expenses } = useBudgets()
  const max = budgets.reduce((total, budget) => { return total + parseFloat(budget.max) }, 0) 
 

  const tExpense = expenses.reduce((total, expense) => { return total + parseFloat(expense?.amount) }, 0)

  console.log("from total card" , expenses)
  
  return (
    <BudgetCard name = "Total Budget" max={max} amount={tExpense} noButton onViewExpensesClick={onViewExpensesClick}/>
  )
}
