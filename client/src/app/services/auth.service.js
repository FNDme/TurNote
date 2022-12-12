import axios from "axios";
const config = require('../config/backend.config.js');

const API_URL = `http://${config.BACKEND_HOST}:8080/api/auth/`;

const register = (username, email, password, name) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    name,
  });
}

const login = async (username, password) => {
  const response = await axios
    .post(API_URL + "signin", {
      username,
      password,
    });
  if (response.data.username) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
}

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));;
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;