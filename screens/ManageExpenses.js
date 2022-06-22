
import { useContext, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native"
import Buttons from "../components/Buttons";
import ErrorOverlay from "../components/ErrorOverlay";
import ExpenseForm from "../components/ExpenseForm";
import IconButton from "../components/IconButton";
import LoadingOverlay from "../components/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpenses = ({route,navigation}) => {
   const [isSubmitting,setisSubmitting]= useState(false)
   const [error, seterror] = useState()
    const expenseCtx=useContext(ExpensesContext);
    const edited=route.params?.expenseId;

    const isEditing=!!edited;

    const selectedExpense=expenseCtx.expenses.find(expense=>expense.id===edited)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEditing?'Edit Expense':'Add Expense'
        })
    },[navigation,isEditing])
    
    async function deleteExpenseHandler(){
        setisSubmitting(true);
        try {
            
            await deleteExpense(edited);
            expenseCtx.deleteExpense(edited)
            navigation.goBack();
        } catch (error) {
            seterror('Could not delete expense -try again')
            setisSubmitting(false)
        }
    }
    function cancelHandler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setisSubmitting(true);
        if(isEditing){
            expenseCtx.updateExpense(edited,expenseData);
            await updateExpense(edited,expenseData);
        }
        else{
           const id=await storeExpense(expenseData);
            expenseCtx.addExpense({...expenseData,id:id});
        }
        navigation.goBack();

    }

    function errorHandler(){
        seterror(null)
      }

    if(error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if(isSubmitting){
        return <LoadingOverlay/>
    }

  return (
    <View style={styles.container}>
        <ExpenseForm onSubmit={confirmHandler} submitButtonLabel={isEditing?'Update':'Add'} onCancel={cancelHandler} defaultValues={selectedExpense}/>
        <View style={styles.delete}>
        {isEditing && <IconButton icon='trash' color={GlobalStyles.colors.error500} 
        size={36} onPress={deleteExpenseHandler}/>}
        </View>
    </View>
  )
}

export default ManageExpenses

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary800
    },
    buttons:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        minWidth:120,
        marginHorizontal:8
    },
    delete:{
        marginTop:16,
        paddingTop:18,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center'
    }
})