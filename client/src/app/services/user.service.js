import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
}

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

const UserService = {
  getPublicContent,
  getUserBoard,
};

export default UserService;