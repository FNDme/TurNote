import axios from "axios";
import * as config from '../config/backend.config.js';

const API_URL = `http://${config.BACKEND_HOST}:8080/api/notes/`;

const publish = (title, content, tags) => {
  console.log("publishing note");
  return axios.post(API_URL, {
    title,
    content,
    tags,
  }, { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

const get = (id) => {
  return axios.get(API_URL + id, { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

const update = (id, title, content, tags) => {
  return axios.put(API_URL + id, {
    title,
    content,
    tags,
  }, { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

const NotesService = {
  publish,
  get,
  update,
};

export default NotesService;