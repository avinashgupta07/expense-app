import { useContext } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput"
import { ExpensesContext } from "../store/expense-context"



const AllExpenses = () => {
  const expensesCtx= useContext(ExpensesContext)
  return (
    <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Last 7 days" fallback='No expenses registered'/>
  )
}

export default AllExpenses