import axios from "axios";
const url='https://react-native-course-2addc-default-rtdb.firebaseio.com'
export async function storeExpense(expenseData){
    const response=await axios.post(url+'/expenses.json',
    expenseData)

    const id=response.data.name
    return id;
}

export async function fetchExpenses(){
   const response=await axios.get(url+'/expenses.json');

   const expenses=[];
   for(const key in response.data){
    const expenseObj={
        id:key,
        amount:response.data[key].amount,
        date:new Date(response.data[key].date),
        description:response.data[key].description
    };

    expenses.push(expenseObj)
   }

   return expenses
}

export function updateExpense(id,expenseData){
    return axios.put(url+`/expenses/${id}.json`,expenseData);

}

export function deleteExpense(id){
    return axios.delete(ur+`/expenses/${id}.json`)
}