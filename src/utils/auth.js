import axios from "axios";
import cookie from "js-cookie";
//set cookie

export const setCookie = (key, value) => {
  console.log(key, value);
  cookie.set(key, value, {
    expires: 1,
  });
};

//remove from cookie

export const removeCookie = (key, value) => {
  cookie.remove(key);
};
//get from cookie such as stored token
//will be useful when we need to make request to server with auth token
export const getCookie = (key) => {
  return cookie.get(key);
};

//set in localStorage
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//remove from localStorage
export const removeLocalStorage = (key, value) => {
  localStorage.removeItem(key);
};

//authenticate user by passing data to cookie and local storage during signin
export const authenticate = (res, next) => {
  console.log(res.data);
  setCookie("token", res.data.userID);
  setLocalStorage("user", res.data);
  next();
};

export const getRole = async (userID) => {
  const res = await axios.post(
    "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getrole",
    {
      userID: userID
    }
  );
  // console.log("res.data", res.data)
  return res.data.userRole;
};

export const getEmail = async (userID) => {
  const res = await axios.post(
    "https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getrole",
    {
      userID: userID
    }
  );
  return await res.data.email;
};
//access user info from localStorage
export const isAuth = () => {
  const cookieChecked = getCookie("token");
  if (cookieChecked) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

//logout

export const logout = (history) => {
  axios
    .get(
      `https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/reducecount`
    )
    .then((res) => {
      console.log(res.data);
      removeCookie("token");
      removeLocalStorage("user");
      history.push("/login");
    });
};
