import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com/recipes",
});

export default instance;
