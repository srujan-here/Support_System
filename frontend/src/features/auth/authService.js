import axios from "axios";
const API_URL = "http://localhost:3005/api/users";

const register = async (userData) => {
console.log("came to service")
  const response = await axios.post(API_URL, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authservice = {
  register,
};

export default authservice;
