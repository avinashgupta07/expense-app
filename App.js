import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/IconButton';
import ExpensesContextProvider from './store/expense-context';

const stack=createNativeStackNavigator();
const bottom=createBottomTabNavigator();

function ExpensesOverview(){
  return <bottom.Navigator screenOptions={({navigation})=>({
    headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
    headerTintColor:'white',
    tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
    tabBarActiveTintColor:GlobalStyles.colors.accent500,
    headerRight:({tintColor})=>(<IconButton icon="add" size={24} 
    color={tintColor} onPress={()=>{
      navigation.navigate('Manage')
    }}/>),

  })}>
    <bottom.Screen name='Recent' component={RecentExpenses} options={{
      title:'Recent Expenses',
      tabBarLabel:'Recent',
      tabBarIcon:({color,size})=>
        <Ionicons name='hourglass' size={size} color={color}/>
      
    }}/>
    <bottom.Screen name='All' component={AllExpenses} options={{
      title:'All Expenses',
      tabBarLabel:'All',
      tabBarIcon:({color,size})=>
        <Ionicons name='calendar' size={size} color={color}/>
      
    }}/>
  </bottom.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
          headerTintColor:'white'
        }}>
          <stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{
            headerShown:false
          }}/>
          <stack.Screen name='Manage' component={ManageExpenses} options={{
            presentation:'modal'
          }}/>
        </stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}


