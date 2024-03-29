import http from "./httpService";
import {apiUrl} from "../config.json";
import jwtDecode from "jwt-decode";
const apiEndpoint =apiUrl+ "/auth";
const tokenKey="token";
http.setJwt(getJwt());
export async function Login (email,password){
    const {data:jwt}= await http.post(apiEndpoint,{email,password});
    localStorage.setItem(tokenKey,jwt);
}
export function loginwithJwt(jwt){
    localStorage.setItem(tokenKey,jwt);
}
export function Logout(){
    localStorage.removeItem(tokenKey);
}
export function getCurrentUser(){
    try {
        const jwt=localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
      } catch (error) {
          return null;
      }
}
export function getJwt(){
    return localStorage.getItem(tokenKey);
}
export default {
    Login,
    loginwithJwt,
    Logout,
    getCurrentUser,
    getJwt
}