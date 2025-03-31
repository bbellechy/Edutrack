import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import TestResultSceeen from "./src/screens/TestResultSceeen";
import ParentResultSceen from "./src/screens/ParentResultSceen";
import PreTestScreen from "./src/screens/PreTestScreen";
import PostTestScreen from "./src/screens/PostTestScreen";

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
        <Stack.Screen name="Pre-Test" component={PreTestScreen} />
        <Stack.Screen name="Post-Test" component={PostTestScreen} />
        <Stack.Screen name="TestResult" component={TestResultSceeen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
