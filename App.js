import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ParentResultSceen from "./src/screens/ParentResultSceen";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ParentResult" component={ParentResultSceen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
