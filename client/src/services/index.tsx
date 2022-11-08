import axios from "axios";

const api = axios.create({
  baseURL: "https://car-register-caio-giffoni.herokuapp.com/",
});
// http://localhost:3000/

export default api;
