import { FlatList, Text } from "react-native"
import ExpenseItem from "./ExpenseItem"

function renderItem(item){
    return <ExpenseItem {...item.item}/>
}
const ExpensesList = ({expenses}) => {
  return (
    <FlatList data={expenses} renderItem={renderItem} keyExtractor={(item)=>item.id}/>
  )
}

export default ExpensesList