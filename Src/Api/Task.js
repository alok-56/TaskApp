import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiConstant } from "../Helper/Contants/Endpoints";


// Create Task Api
export const CreateTaskApi = async (payload) => {
  let token=await AsyncStorage.getItem('token')
  console.log(token)
  try {
    let res = await fetch(`${ApiConstant.BASEURL}/${ApiConstant.CREATETASK}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        "token":`${token}`
      },
    });
    res = await res.json();
    return res;
  } catch (error) {
    return error.message;
  }
};

// Update Task Api

export const UpdateTaskApi = async (payload,id) => {
  let token=await AsyncStorage.getItem('token')
  try {
    let res = await fetch(`${ApiConstant.BASEURL}/${ApiConstant.UPDATETASK}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
         "token":`${token}`
      },
    });
    res = await res.json();
    return res;
  } catch (error) {
    return error.message;
  }
};

// GET ALL TASK
export const GetAllTaskApi = async () => {
  let token=await AsyncStorage.getItem('token')
  try {
    let res = await fetch(`${ApiConstant.BASEURL}/${ApiConstant.GETALLTASK}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
         "token":`${token}`
      },
    });
    res = await res.json();
    return res;
  } catch (error) {
    return error.message;
  }
};

// GET BY ID

export const GetMYTaskApi = async (id) => {
  let token=await AsyncStorage.getItem('token')
  try {
    let res = await fetch(`${ApiConstant.BASEURL}/${ApiConstant.MYTASK}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
         "token":`${token}`
      },
    });
    res = await res.json();
    return res;
  } catch (error) {
    return error.message;
  }
};

// DELETE TASK API

export const DeleteTaskApi = async (id) => {
  let token=await AsyncStorage.getItem('token')
  try {
    let res = await fetch(`${ApiConstant.BASEURL}/${ApiConstant.DELETETASK}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
         "token":`${token}`
      },
    });
    res = await res.json();
    return res;
  } catch (error) {
    return error.message;
  }
};
