
import { ApiConstant } from "../Helper/Contants/Endpoints";

// Login Api
export const LoginApi = async (payload) => {
  try {
    let res = await fetch(`${ApiConstant.BASEURL}/${ApiConstant.LOGIN}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
    return res;
  } catch (error) {
    return error.message;
  }
};

// SignUp Api

export const SignupApi = async (payload) => {
  try {
    let res = await fetch(`${ApiConstant.BASEURL}/${ApiConstant.SIGNUP}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    });
    res = await res.json();
    return res;
  } catch (error) {
    return error.message;
  }
};
