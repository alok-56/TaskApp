import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Pages/Home/Home";
import { NavigationConstant } from "../Helper/Contants/Navigation";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={NavigationConstant.HOME_SCREEN} component={Home} />
    </Stack.Navigator>
  );
};

export default AppStack;
