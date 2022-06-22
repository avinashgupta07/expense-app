
import { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import ErrorOverlay from '../components/ErrorOverlay'
import ExpensesOutput from "../components/ExpensesOutput"
import LoadingOverlay from '../components/LoadingOverlay'
import { ExpensesContext } from '../store/expense-context'

import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'


const RecentExpenses = () => {
  const [isFetching, setisFetching] = useState(true)
  const [error, seterror] = useState()
  const expensesCtx=useContext(ExpensesContext)
  useEffect(()=>{
    async function getExpenses(){
      setisFetching(true);
      try{

        const expenses=await fetchExpenses();
        expensesCtx.setExpenses(expenses)
      }
      catch(error){
        seterror('Could not fetch expenses!');
      }
      setisFetching(false)
      
    }

    getExpenses();
  },[])

  function errorHandler(){
    seterror(null)
  }

  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if(isFetching){
    return <LoadingOverlay/>
  }

  const recentExpenses=expensesCtx.expenses.filter((expense)=>{
    const today=new Date();
    const date7Days=getDateMinusDays(today,7);

    return expense.date>date7Days;
  })


  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallback='No expenses registered'/>
    
  )
}

export default RecentExpenses