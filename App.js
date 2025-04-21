import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import TestResultSceeen from "./src/screens/TestResultSceeen";
import ParentResultSceen from "./src/screens/ParentResultSceen";
import SubjectSelectScreen from "./src/screens/SubjectSelectScreen";
import PostTestScreen from "./src/screens/PostTestScreen";
import PreTestScreen from "./src/screens/PreTestScreen";
import DeletePreTestSceeen from "./src/screens/DeletePreTestScreen";
import DeletePostTestSceeen from "./src/screens/DeletePostTestScreen";
import AddPreTestScreen from "./src/screens/AddEditPreTestScreen";
import AddEditQuestionScreen from "./src/screens/AddEditQuestionScreen";
import AddPostTestScreen from "./src/screens/AddEditPostTestScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ParentResult" component={ParentResultSceen} />
        <Stack.Screen name="PostTest" component={PostTestScreen} />
        <Stack.Screen name="SubjectSelect" component={SubjectSelectScreen} />
        <Stack.Screen name="PreTest" component={PreTestScreen} />
        <Stack.Screen name="TestResult" component={TestResultSceeen} />
        <Stack.Screen name="DeletePreTest" component={DeletePreTestSceeen} />
        <Stack.Screen name="DeletePostTest" component={DeletePostTestSceeen} />
        <Stack.Screen name="AddEditPreTest" component={AddPreTestScreen} />
        <Stack.Screen name="AddEditQuestion" component={AddEditQuestionScreen} />
        <Stack.Screen name="AddEditPostTest" component={AddPostTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
