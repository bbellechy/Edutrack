import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import TestResultSceeen from "./src/screens/TestResultSceeen";
import ParentResultSceen from "./src/screens/ParentResultSceen";
import SubjectSelectSceen from "./src/screens/SubjectSelectSceen";
import MultipleChoiceForm from "./src/screens/MultipleChoiceFormScreen";
import ManualScoringForm from "./src/screens/ManualScoringFormScreen";

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
        <Stack.Screen name="Multiple" component={MultipleChoiceForm} />
        <Stack.Screen name="SubjectSelect" component={SubjectSelectSceen} />
        <Stack.Screen name="Manual" component={ManualScoringForm} />
        <Stack.Screen name="TestResult" component={TestResultSceeen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
