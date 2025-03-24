import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppStack from "./Src/Navigation/AppStack";
import AuthStack from "./Src/Navigation/AuthStack";
import { authcontext, AuthContextProvider } from "./Src/Context/AuthContext";

const EntryScreen = () => {
  let { islogin, setislogin } = useContext(authcontext);

  const CheckUserToken = async () => {
    let login = await AsyncStorage.getItem("token");
    if (login !== null) {
      setislogin(true);
    } else {
      setislogin(false);
    }
  };

  useEffect(() => {
    CheckUserToken();
  }, []);

  return (
    <>
      <NavigationContainer>
        {islogin ? <AppStack></AppStack> : <AuthStack></AuthStack>}
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <EntryScreen></EntryScreen>
      </AuthContextProvider>
    </>
  );
};

export default App;
