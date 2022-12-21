import axios from "axios";
import * as config from '../config/backend.config.js';

const API_URL = `http://${config.BACKEND_HOST}:8080/api/notes/`;

const publish = (title, content, tags) => {
  return axios.post(API_URL, {
    title,
    content,
    tags,
  }, { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

/* more code */

const NotesService = {
  publish,
  /* more code */
};

export default NotesService;