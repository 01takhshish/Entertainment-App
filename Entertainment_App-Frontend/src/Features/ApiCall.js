import axios from "axios";

// const BASE_URL = "https://entertainment-app-backend-takhshish.onrender.com/";
const BASE_URL = "https://entertainment-app-backend-3huo.onrender.com/";
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
