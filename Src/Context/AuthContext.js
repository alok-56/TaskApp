import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const authcontext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [islogin, setislogin] = useState(false);
  useEffect(() => {
    Handleuserlogin();
  }, []);
  const Handleuserlogin = async () => {
    let token = await AsyncStorage.getItem("token");
    if (token === null) {
      setislogin(false);
    } else {
      setislogin(true);
    }
  };
  return (
    <authcontext.Provider value={{ islogin, setislogin }}>
      {children}
    </authcontext.Provider>
  );
};
