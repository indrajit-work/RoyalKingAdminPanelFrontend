import axios from "axios";
import { getCookie } from "./auth";
const userID=getCookie("token");
console.log(userID);
export const fetchAdmin=async(role)=>{

      return  await  axios.post("https://gf8mf58fp2.execute-api.ap-south-1.amazonaws.com/Royal_prod/users/login/admin/getsuperadmin",{
            userRole:role
        })
       
    
}