import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationConstant } from "../Helper/Contants/Navigation";
import Splash from "../Pages/Onboarding/Splash";
import Login from "../Pages/Onboarding/Login";
import Signup from "../Pages/Onboarding/Signup";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NavigationConstant.SPLASH_SCREEN}
        component={Splash}
      />
      <Stack.Screen name={NavigationConstant.LOGIN_SCREEN} component={Login} />
      <Stack.Screen
        name={NavigationConstant.SIGNUP_SCREEN}
        component={Signup}
      />
      <Stack.Screen name={NavigationConstant.APP_STACK} component={AppStack} />
    </Stack.Navigator>
  );
}

export default AuthStack;
