import axios from "axios";
const API_URL = "api/users";

const register = async (userData) => {
  const response = await axios.request(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authservice = {
  register,
};

export default authservice;
